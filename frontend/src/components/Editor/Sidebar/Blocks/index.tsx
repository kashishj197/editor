import React from "react";
import BlockPreviewCard from "../Blocks/Cards";
import { useAppSelector } from "@/app/hooks";
import SidebarBody from "../SidebarBody";
import { BlockDefinition } from "@/utils/models/models";

interface BlocksDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BlocksDrawer: React.FC<BlocksDrawerProps> = ({ open, onOpenChange }) => {
  const { blockDefinitions } = useAppSelector((state) => state.app);
  return (
    <SidebarBody open={open} onClose={onOpenChange} title={"Blocks"}>
      {blockDefinitions.map((block: BlockDefinition) =>
        !block.unique ? <BlockPreviewCard key={block.id} block={block} /> : null
      )}
    </SidebarBody>
  );
};

export default BlocksDrawer;
