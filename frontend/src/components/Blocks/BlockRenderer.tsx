import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  DraftHandleValue,
} from "draft-js";
import { TemplateNode } from "../../utils/models/TemplateNodeModel";
import { resolveClassNames } from "../../utils/helpers/helper";
import _ from "lodash";
import { useDebounce } from "use-debounce";
import Toolbar from "../Editor/Toolbar/Wysiwyg";
import {
  customStyleFn,
  customStyleMap,
  getBlockStyle,
  styles,
} from "../../utils/core/config";
import {
  getLengthOfSelectedText,
  getSelectionRange,
  mediaBlockRenderer,
} from "./helper";
import { getSelectionValues } from "../../utils/core/getSelectionValues";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateGlobalBlock } from "../../features/app/appSlice";

const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

interface BlockRendererProps {
  node: TemplateNode;
  data: Record<string, any>; // twig-like structure
  rtl?: boolean;
  global?: boolean; // if this is a global block
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  node,
  data,
  rtl,
  global,
}) => {
  const previewMode = useAppSelector((state) => state.preview.enabled);
  const refNode = useRef(null);
  const { tagName: Tag, attrs = {}, children = [], text } = node;
  const className = resolveClassNames(attrs.className);
  const otherAttrs = { ...attrs, className };
  const dispatch = useAppDispatch();

  const onChange = (editorState: EditorState) => {
    setEditor((prevState: any) => {
      const getSelectionBounds = () => {
        if (
          !editorState.getSelection().isCollapsed() &&
          !prevState.selectionObj
        ) {
          const newSelectionRangeAt = getSelectionRange();
          if (!newSelectionRangeAt) {
            return false;
          }
          return {
            length: getLengthOfSelectedText(editorState),
            selectionBounds: newSelectionRangeAt.getBoundingClientRect(),
          };
        }
        if (prevState.selectionObj) {
          const selectionLength = getLengthOfSelectedText(editorState);
          if (selectionLength === prevState.selectionObj.length) {
            return prevState.selectionObj;
          }
          if (selectionLength !== 0) {
            const newSelectionRangeAt = getSelectionRange();
            if (!newSelectionRangeAt) {
              return prevState.selectionObj;
            }
            return {
              length: selectionLength,
              selectionBounds: newSelectionRangeAt.getBoundingClientRect(),
            };
          }
          return false;
        }
        return false;
      };

      const selectionBounds = getSelectionBounds();
      return {
        ...prevState,
        editorState,
        selectionObj: selectionBounds,
        init: true,
      };
    });
  };

  const content =
    text?.source?.typeData === "data" ? _.get(data, text.source.value) : null;
  const [editor, setEditor] = useState({
    editorState: content?.blocks
      ? EditorState.createWithContent(convertFromRaw(content))
      : EditorState.createEmpty(),
    // editorState: EditorState.createEmpty(),
    plainText: false,
    selectionObj: false,
    init: false,
  });

  const { selectionObj } = editor;

  const [debounceEditorState] = useDebounce(editor, 1000);

  const getRawContent = useCallback(
    () => convertToRaw(editor.editorState.getCurrentContent()),
    [editor.editorState]
  );

  const prevRawRef = useRef<any>(
    convertToRaw(editor.editorState.getCurrentContent())
  );

  useEffect(() => {
    const newRawContent = convertToRaw(
      debounceEditorState.editorState.getCurrentContent()
    );

    if (!_.isEqual(prevRawRef.current, newRawContent)) {
      prevRawRef.current = newRawContent;

      const twigKey = text?.source?.value;
      if (!twigKey) return;

      if (global) {
        dispatch(
          updateGlobalBlock({
            key: twigKey, // e.g., "title" or "logo"
            value: newRawContent, // full Draft.js raw structure
          })
        );
      }
    }
  }, [debounceEditorState, text?.source?.value]);

  const getEditorState = () => {
    const { editorState } = editor;
    return editorState;
  };

  const onChangeEditorState = (newEditorState: EditorState) => {
    setEditor((prevState) => ({
      ...prevState,
      editorState: newEditorState,
    }));
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState,
    eventTimeStamp: number
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const isEditable = text?.editor;
  const editorOptions = text?.tooltip || {};

  if (!Tag) return null;
  const TagComponent = Tag as keyof JSX.IntrinsicElements;

  if (voidElements.has(Tag)) {
    return <TagComponent {...otherAttrs} />;
  }

  return (
    <TagComponent {...otherAttrs}>
      {isEditable ? (
        <div className="editable-block">
          <Editor
            editorState={editor.editorState}
            blockRendererFn={(block) =>
              mediaBlockRenderer(block, getEditorState, onChangeEditorState)
            }
            placeholder={text?.placeholder ? text?.placeholder : undefined}
            onChange={previewMode ? () => {} : onChange}
            handleKeyCommand={
              previewMode ? () => "not-handled" : handleKeyCommand
            }
            ref={refNode}
            readOnly={previewMode}
            customStyleMap={{}}
            blockStyleFn={getBlockStyle}
            customStyleFn={customStyleFn}
          />

          {!previewMode &&
          editor.editorState &&
          text?.tooltip &&
          selectionObj ? (
            <Toolbar
              tooltip={{ options: { ...editorOptions } }}
              styles={styles}
              editorState={editor.editorState}
              onChange={onChangeEditorState}
              selectionRangeObj={selectionObj?.selectionBounds}
              activeObj={getSelectionValues(editor.editorState)}
              onClose={() =>
                setEditor((prevState) => ({
                  ...prevState,
                  selectionObj: false,
                }))
              }
            />
          ) : null}
        </div>
      ) : (
        content && typeof content === "string" && content
      )}
      {children.map((child, idx) => (
        <BlockRenderer
          key={idx}
          node={child}
          data={data}
          rtl={rtl}
          global={global}
        />
      ))}
    </TagComponent>
  );
};
