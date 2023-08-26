import Link from "next/link";
import React from "react";

interface IconWithBadgeProps {
  icon: any;
  href: string;
  objectCount: Array<any>;
}

function IconWithBadge({ icon: Icon, objectCount, href }: IconWithBadgeProps) {
  return (
    <Link href={href} className="mx-1">
      <div className="relative">
        <Icon className="h-5" />
        {objectCount && objectCount.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {objectCount.length}
          </span>
        )}
      </div>
    </Link>
  );
}

export default IconWithBadge;
