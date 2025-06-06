import React from "react";

const SidebarIcon = ({
  icon,
  label,
  onClick,
  active,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  active: boolean;
}) => (
  <button
    className={`w-full py-3 flex justify-center text-xl ${
      active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
    title={label}
  >
    {icon}
  </button>
);

export default SidebarIcon;
