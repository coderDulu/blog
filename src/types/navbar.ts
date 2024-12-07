interface NavbarItem {
  id: number;
  icon: string;
  title: string;
  url: string;
  children?: NavbarItem[];
}

export type { NavbarItem };
