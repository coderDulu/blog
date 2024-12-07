// scripts/copy.mjs
import { createWriteStream } from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname, join  } from 'path';
import pkg from 'fs-extra';
import archiver from 'archiver';

const { ensureDir, copy, readFileSync, mkdirSync  } = pkg;
// 获取当前文件的目录路径
const __dirname = dirname(fileURLToPath(import.meta.url));

// 读取并解析YAML配置文件
const config = yaml.load(
  readFileSync(join(__dirname, './zip.config.yaml'), 'utf8')
);

async function copyFiles() {
  const { dirs, output, logging } = config;

  try {
    // 确保目标目录存在
    await ensureDir(dirs.static.dest);
    await ensureDir(dirs.public.dest);

    // 复制文件
    await copy(dirs.static.src, dirs.static.dest);
    await copy(dirs.public.src, dirs.public.dest);

    if (logging.enabled) {
      console.log('Files copied successfully!');
    }

    // 创建zip文件
    // 创建output目录
    mkdirSync(dirname(output.zip.name), { recursive: true });
    const outputStream = createWriteStream(output.zip.name);
    const archive = archiver('zip', {
      zlib: { level: output.zip.compression },
    });

    outputStream.on('close', () => {
      if (logging.enabled) {
        console.log(`Archive created! Total bytes: ${archive.pointer()}`);
      }
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(outputStream);

    // 添加整个standalone目录到zip
    archive.directory(dirs.standalone, false);

    await archive.finalize();
  } catch (err) {
    if (logging.level !== 'silent') {
      console.error('Error:', err);
    }
  }
}

copyFiles();
