import React from "react";

interface Props {
  id: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarMenuItem: React.FC<Props> = ({
  icon,
  title,
  active = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`editor__sidebar-menu-item animate-transition-05 cursor-pointer w-full flex justify-center py-3 ${
        active ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="editor__sidebar-menu-item-icon">{icon}</div>
        <div className="editor__sidebar-menu-item-title text-xs mt-1">
          {title}
        </div>
      </div>
    </div>
  );
};

export default SidebarMenuItem;
