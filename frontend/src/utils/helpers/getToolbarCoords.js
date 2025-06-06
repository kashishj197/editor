import { tooltip } from "./getOffsets";

export const getToolbarCoords = (toolBarBounds, selectRangeBounds) => {
  const offsets = tooltip(toolBarBounds, selectRangeBounds);
  return {
    position: "absolute",
    ...offsets,
  };
};
