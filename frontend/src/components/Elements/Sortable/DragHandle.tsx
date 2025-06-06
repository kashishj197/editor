import React from "react";
import { SortableHandle } from "react-18-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <div
    className="no-print p-1 cursor-grab hover:text-blue-500"
    title="Drag block"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M4 3h2v2H4V3zm6 0h2v2h-2V3zM4 7h2v2H4V7zm6 0h2v2h-2V7zM4 11h2v2H4v-2zm6 0h2v2h-2v-2z" />
    </svg>
  </div>
));

export default DragHandle;
