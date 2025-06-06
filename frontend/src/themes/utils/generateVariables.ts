export const flattenObjectToCSSVars = (
  obj: Record<string, any>,
  prefix = "--"
): Record<string, string> => {
  const result: Record<string, string> = {};

  const recurse = (obj: any, keyPath: string[] = []) => {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const value = obj[key];
      const fullPath = [...keyPath, key];

      if (typeof value === "object" && value !== null) {
        recurse(value, fullPath);
      } else {
        const varName = prefix + fullPath.join("-").toLowerCase();
        result[varName] = typeof value === "number" ? `${value}px` : value;
      }
    }
  };

  recurse(obj, []);
  return result;
};

export const applyThemeVariablesViaStyleTag = (theme: Record<string, any>) => {
  // const styleId = "theme-style-vars";
  // const existingStyle = document.getElementById(styleId);
  // if (existingStyle) existingStyle.remove();

  // const style = document.createElement("style");
  // style.id = styleId;

  // const vars = flattenObjectToCSSVars(theme); // Using the flatten function we defined earlier

  // const cssVars = Object.entries(vars)
  //   .map(([key, value]) => `${key}: ${value};`)
  //   .join("\n");

  // style.innerHTML = `:root {\n${cssVars}\n}`;
  // document.head.appendChild(style);

  const headingScale = theme.headingScale;
  const headingStyleId = "heading-scale-style";
  const existingHeadingStyle = document.getElementById(headingStyleId);
  if (existingHeadingStyle) existingHeadingStyle.remove();

  if (headingScale && typeof headingScale === "object") {
    const headingStyle = document.createElement("style");
    headingStyle.id = headingStyleId;

    const headingCSS = Object.entries(headingScale)
      .map(([tag, px]) => {
        const rem = (Number(px) / 16).toFixed(3);
        return `
          ${tag} {
            font-size: ${rem}rem; /* ${px}px */
            font-weight: 700;
            font-style: normal;
            font-family: 'Cairo', serif;
          }
        `;
      })
      .join("\n");

    headingStyle.innerHTML = headingCSS;
    document.head.appendChild(headingStyle);
  }
};
