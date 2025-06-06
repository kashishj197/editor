import React from "react";
import { SortableContainer } from "react-18-sortable-hoc";
import SortableBlock from "./SortableBlock";

const SortableBlockContainer = SortableContainer(({ blocks }: any) => {
  return (
    <div>
      {blocks.map((block: any, index: number) => (
        <SortableBlock
          key={block.blockDefinitionId + index}
          index={index}
          block={block}
        />
      ))}
    </div>
  );
});

export default SortableBlockContainer;
