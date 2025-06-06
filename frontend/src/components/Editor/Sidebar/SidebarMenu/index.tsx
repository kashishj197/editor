import React from "react";
import SidebarMenuItem from "./Item";
import { useAppSelector } from "../../../../app/hooks";
import PreviewToggleButton from "./Preview/Button";
import PrintButton from "./Print";

interface SidebarMenuProps {
  activeTab: "pages" | "blocks" | "";
  setActiveTab: (tab: "pages" | "blocks" | "") => void;
}

function SidebarMenu({ activeTab, setActiveTab }: SidebarMenuProps) {
  const previewMode = useAppSelector((state) => state.preview.enabled);
  return !previewMode ? (
    <div className="no-print editor__sidebar-menu w-24 bg-white border-r shadow-md flex flex-col items-center pt-4 h-screen">
      <SidebarMenuItem
        id="pages"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M1.674 2h2.78l1.07 20h-.957a1 1 0 01-.987-.841l-2.894-18A1 1 0 011.674 2z" />
            <path d="M14.5 0v7a1 1 0 001 1h9v15a1 1 0 01-1 1H8.96a1 1 0 01-1-.958l-.917-22A1 1 0 018.001 0H14.5z" />
            <path d="M16.8.6l6 4.5a.5.5 0 01-.3.9H17a1 1 0 01-1-1V1a.5.5 0 01.8-.4z" />
          </svg>
        }
        title="Pages"
        active={activeTab === "pages"}
        onClick={() => setActiveTab("pages")}
      />
      <SidebarMenuItem
        id="blocks"
        icon={
          <svg width="24" height="24">
            <rect width="18" height="4" x="3" rx="1" />
            <rect width="18" height="4" x="3" y="20" rx="1" />
            <rect width="24" height="12" y="6" rx="1" />
          </svg>
        }
        title="Blocks"
        active={activeTab === "blocks"}
        onClick={() => setActiveTab("blocks")}
      />
      <PrintButton />
      <PreviewToggleButton />
    </div>
  ) : (
    <div className="no-print absolute bottom-0 left-0 z-50 w-28">
      <PreviewToggleButton />
    </div>
  );
}

export default SidebarMenu;
