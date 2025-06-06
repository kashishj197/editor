import React from "react";
import SortableBlockContainer from "./SortableContainer";

import { arrayMove } from "react-18-sortable-hoc";
import { BlockRenderer } from "@/components/Blocks/BlockRenderer";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setBlocks } from "@/features/app/appSlice";

const SortableBlockWrapper = () => {
  const blocks = useAppSelector((state) => state.app.page.blocks);
  const layouts = useAppSelector((state) => state.app.layouts);
  const previewMode = useAppSelector((state) => state.preview.enabled);
  const dispatch = useAppDispatch();

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    const newOrder = arrayMove(blocks, oldIndex, newIndex);
    dispatch(setBlocks(newOrder));
  };

  const getTemplate = (blockLayoutId: string) => {
    return layouts.find((layout) => layout?.id === blockLayoutId)?.template;
  };

  if (previewMode) {
    return (
      <>
        {blocks.map((block, index) => {
          const layout = getTemplate(block.blockData?.layout_id || "");
          const templateData = { twig: block.blockData?.data };

          if (!layout) return null;

          return (
            <BlockRenderer
              key={block.blockDefinitionId + "-" + index}
              node={layout}
              data={templateData}
            />
          );
        })}
      </>
    );
  }

  const sortableBlocks = blocks.map((block) => ({
    ...block,
    layout: getTemplate(block.blockData?.layout_id || ""),
    data: block.blockData?.data,
  }));

  return (
    <SortableBlockContainer blocks={sortableBlocks} onSortEnd={onSortEnd} />
  );
};

export default SortableBlockWrapper;
