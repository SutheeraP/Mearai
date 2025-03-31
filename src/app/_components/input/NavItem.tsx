import React from "react";
import Link from "next/link";

interface NavItemProps {
  icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  path: string;
  isSelect: boolean;
}

export default function NavItem({
  icon: IconComponent,
  label,
  path,
  isSelect,
}: NavItemProps) {
  return (
    <div className={`${isSelect ? "text-main" : ""}`}>
      {/* md */}
      <Link
        href={path}
        className="hidden w-fit cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-slate-500 hover:bg-opacity-10 md:flex"
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
