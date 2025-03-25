import React from "react";
import Link from "next/link";

interface NavItemProps {
  icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  path: string;
}

export default function NavItem({
  icon: IconComponent,
  label,
  path,
}: NavItemProps) {
  return (
    <div>
      {/* md */}
      <Link
        href={path}
        className="hidden w-fit cursor-pointer items-center gap-3 border-slate-100 px-3 py-2 hover:border-l md:flex"
      >
        <IconComponent size={15} />
        <div className="font-medium uppercase tracking-wider">{label}</div>
      </Link>

      {/* mobile */}
      <Link href={path} className="md:hidden">
        <IconComponent size={25} />
      </Link>
    </div>
  );
}
