import { BlockDefinition } from "@/utils/models/models";
import React from "react";
import { useDrag } from "react-dnd";

interface BlockPreviewCardProps {
  block: BlockDefinition;
}

const BlockPreviewCard: React.FC<BlockPreviewCardProps> = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: { ...block },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white border p-3 rounded-md shadow-md transition-all cursor-move ${
        isDragging ? "opacity-50 scale-95" : "hover:shadow-lg"
      }`}
    >
      <span className="text-sm font-medium text-gray-800">{block.name}</span>
    </div>
  );
};

export default BlockPreviewCard;
