/// <reference types="vite-plugin-svgr/client" />
declare module "draft-js-clear-formatting" {
  import { EditorState } from "draft-js";
  interface ClearFormattingOptions {
    inline?: boolean;
    entities?: boolean;
    lists?: boolean;
  }
  export default function clearFormatting(
    editorState: EditorState,
    options?: ClearFormattingOptions
  ): EditorState;
}

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
