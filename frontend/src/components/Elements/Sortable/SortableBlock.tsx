import { BlockRenderer } from "@/components/Blocks/BlockRenderer";
import React from "react";
import { SortableElement } from "react-18-sortable-hoc";
import DragHandle from "./DragHandle";

const SortableBlock = SortableElement(({ block }: any) => {
  const layout = block.layout;
  const data = block.data;

  if (!layout) return null;

  return (
    <div
      className="mb-4 rounded-md border border-transparent transition-all duration-100 ease-out 
      hover:border-blue-400 hover:bg-gray-50 hover:shadow-md select-none"
    >
      <div className="flex gap-2 items-start">
        <DragHandle />
        <div className="flex-1">
          <BlockRenderer
            key={block.blockDefinitionId}
            node={layout}
            data={{ twig: data }}
          />
        </div>
      </div>
    </div>
  );
});

export default SortableBlock;
