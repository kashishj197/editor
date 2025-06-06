import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { togglePreviewMode } from "../../../../../features/preview/previewSlice";
import "./_sidebar-footer.scss";

const PreviewToggleButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const previewMode = useAppSelector((state) => state.preview.enabled);

  return (
    <div className="no-print editor__sidebar-footer p-4 border-t w-full flex justify-center">
      <button
        onClick={() => dispatch(togglePreviewMode())}
        className="editor__publish-button text-blue-600 hover:text-blue-800 transition-all flex flex-col items-center gap-1"
        title={previewMode ? "Edit" : "Preview"}
      >
        {previewMode ? (
          // ✏️ Pencil icon (Edit mode)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#1a73a7"
          >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
          </svg>
        ) : (
          // 👁️ Eye icon (Preview mode)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#1a73a7"
          >
            <path d="M12 4.5c-7 0-11 7.5-11 7.5s4 7.5 11 7.5 11-7.5 11-7.5-4-7.5-11-7.5zm0 13a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-2.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        )}

        <span className="text-xs font-medium">
          {previewMode ? "Edit" : "Preview"}
        </span>
      </button>
    </div>
  );
};

export default PreviewToggleButton;
