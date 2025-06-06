// Flatten className objects
export const resolveClassNames = (
  classArray?: (string | Record<string, boolean>)[]
): string => {
  if (!classArray) return "";
  return classArray
    .map((cls) => {
      if (typeof cls === "string") return cls;
      return Object.entries(cls)
        .filter(([, enabled]) => enabled)
        .map(([name]) => name)
        .join(" ");
    })
    .join(" ");
};

export const injectStyleTag = (cssContent: string) => {
  let styleEl = document.getElementById("generated-block-style");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.setAttribute("id", "generated-block-style");
  }
  styleEl.textContent = cssContent;
  document.body.appendChild(styleEl);
};

export const fitsOnScreen = (node: any) => {
  if (node) {
    const parties = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    };

    const bounding = node.getBoundingClientRect();
    const { body } = document;
    const nodeWidth = bounding.width;
    const nodeHeight = bounding.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const bodyHeight = body.scrollHeight;

    const emptiness = windowWidth - nodeWidth;
    parties.right = bounding.left < emptiness;
    parties.left = bounding.right > emptiness;

    const emptinessBottom = bodyHeight - node.offsetTop;
    parties.bottom =
      windowHeight + 6 === bounding.top ? false : emptinessBottom > nodeHeight;
    parties.top = node.offsetTop > nodeHeight;

    return parties;
  }
  return false;
};

export const isClickToToolbarNode = (toolbarClass: any, target: any) => {
  const toolbarNodes = document.getElementsByClassName(toolbarClass);

  if (toolbarNodes) {
    for (let i = 0; i < toolbarNodes.length; i++) {
      if (toolbarNodes[i].contains(target)) {
        return true;
      }
    }
  }
  return false;
};
