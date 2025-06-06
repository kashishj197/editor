// @ts-nocheck
import React from "react";
import { BlockRenderer } from "../Blocks/BlockRenderer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useDrop } from "react-dnd";
import SortableBlockWrapper from "../Elements/Sortable/SortableBlockWrapper";
import { addBlockToPage } from "@/features/app/appSlice";

const EditorView: React.FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.app.page);
  const layouts = useAppSelector((state) => state.app.layouts);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BLOCK",
    drop: async (item: any) => {
      const newBlock = {
        blockDefinitionId: item.id,
        blockData: item,
      };

      dispatch(addBlockToPage(newBlock)); // Redux
      // await api.saveBlockToPage(newBlock); // DB
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getTemplate = (blockLayoutId: string) => {
    return layouts.find((layout) => layout?.id === blockLayoutId)?.template;
  };

  if (!page) return null;

  return (
    <>
      {/* Header */}
      {page.globals?.header && page.globals.headerData && (
        <BlockRenderer
          key={"header"}
          node={getTemplate(page.globals.headerData.layout_id)!}
          data={{ twig: page.globals.headerData.data }}
          global={true}
          id={page.globals?.header}
        />
      )}

      {/* <div ref={drop} className={`relative p-4 ${isOver ? "bg-blue-50" : ""}`}> */}
      {/* Page Blocks */}
      {/* {page.blocks.map((block, index) => {
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
        })} */}
      <div ref={drop} className={`relative p-4 ${isOver ? "bg-blue-50" : ""}`}>
        <SortableBlockWrapper />
      </div>
      {/* </div> */}

      {/* Footer */}
      {page.globals?.footer && page.globals.footerData && (
        <BlockRenderer
          key={"footer"}
          node={getTemplate(page.globals.footerData.layout_id)!}
          data={{ twig: page.globals.footerData.data }}
          global={true}
          id={page.globals?.footer}
        />
      )}
    </>
  );
};

export default EditorView;
