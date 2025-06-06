// File: components/Sidebar/SidebarBody.tsx
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import "@/styles/sidebar/_sidebar-body.scss";

interface SidebarBodyProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void; // optional callback for closing
}

const SidebarBody: React.FC<SidebarBodyProps> = ({
  open,
  title,
  children,
  onClose,
}) => {
  return open ? (
    <aside
      className={`fixed top-0 left-[6rem] z-40 h-screen w-[280px] bg-white border-r shadow-md transition-transform duration-300 ease-in-out transform ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            ✖
          </button>
        )}
      </div>
      <ScrollArea className="h-[calc(100vh-64px)] p-3 space-y-3">
        {children}
      </ScrollArea>
    </aside>
  ) : null;
};

export default SidebarBody;
