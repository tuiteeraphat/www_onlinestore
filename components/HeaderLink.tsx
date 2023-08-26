import Link from "next/link";
import { ReactNode } from "react";

interface HeaderLinkProps {
  href: string;
  children: ReactNode;
}

function HeaderLink({ href, children }: HeaderLinkProps) {
  return (
    <Link href={href} className="flex items-center cursor-pointer mx-1">
      {children}
    </Link>
  );
}

export default HeaderLink;
