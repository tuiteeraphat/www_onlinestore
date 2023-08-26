import Link from "next/link";
interface MenuLinkSidebarProps {
  icon: any;
  text: string;
  href: string;
}

export default function MenuLinkSidebar({
  icon: Icon,
  text,
  href,
}: MenuLinkSidebarProps) {
  return (
    <Link href={href}>
      <li className="flex items-center my-2">
        <Icon className="h-5" />
        <span className="hidden group-hover:block ml-2">{text}</span>
      </li>
    </Link>
  );
}
