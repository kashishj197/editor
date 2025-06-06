import React, { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import BlocksDrawer from "./Blocks";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pages" | "blocks" | "">("pages");

  return (
    <>
      <SidebarMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <BlocksDrawer
        open={activeTab === "blocks"}
        onOpenChange={() => setActiveTab("pages")}
      />
    </>
  );
};

export default Sidebar;
