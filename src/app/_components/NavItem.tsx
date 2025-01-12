import React from "react";

interface NavItemProps {
  icon: React.FC;
  label: string;
}

export default function NavItem({ icon: IconComponent, label }: NavItemProps) {
  return (
    <div>
      {/* md */}
      <div className="hidden md:flex w-fit cursor-pointer items-center gap-3 border-slate-100 px-3 py-2 hover:border-l">
        <IconComponent size={15} />
        <div className="font-medium uppercase tracking-wider">
          {label}
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <IconComponent size={25} />
      </div>
    </div>
  );
}
