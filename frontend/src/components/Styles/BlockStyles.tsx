import React, { useEffect } from "react";
import { layout } from "../../mockData";
import { injectStyleTag } from "../../utils/helpers/helper";
import { useAppSelector } from "../../app/hooks";

export default function BlockStyles() {
  const { layouts } = useAppSelector((state) => state.app);
  type StyleObject = { attributes?: Record<string, string> };
  const generateCSSFromStyleMap = (styleMap: Record<string, StyleObject>) => {
    return Object.entries(styleMap)
      .map(([selector, styleObj]) => {
        const declarations = Object.entries(styleObj?.attributes || {})
          .map(([prop, val]) => `  ${prop}: ${val};`)
          .join("\n");

        return `${selector} {\n${declarations}\n}`;
      })
      .join("\n");
  };

  type LayoutValue = {
    name?: string;
    styles?: {
      children?: Record<string, StyleObject>;
    };
    // Add other properties as needed
  };

  useEffect(() => {
    const css = Object.entries(layouts).map(([_, value]) => {
      const layoutValue = value as LayoutValue;
      return generateCSSFromStyleMap(layoutValue.styles?.children || {});
    });
    injectStyleTag(css.join("\n"));
  }, [layouts]);
  return <></>;
}
