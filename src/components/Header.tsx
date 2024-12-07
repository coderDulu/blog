import { Separator } from '@radix-ui/react-separator';
import { SidebarTrigger } from './ui/sidebar';
import yaml from 'js-yaml';
import pkg from 'fs-extra';
import { join } from 'path';
const { readFileSync } = pkg;
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Config } from '@/types/config';

const filePath = join(process.cwd(), 'config.yaml');
// 读取并解析YAML配置文件
const config: Config = yaml.load(readFileSync(filePath, 'utf8')) as Config;

function Header() {
  console.log('cpnf', config);
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 justify-between">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="justify-end">
        <Avatar>
          <AvatarImage src={config.avatar} />
          <AvatarFallback>头像</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Header;
