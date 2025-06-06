import { useAppSelector } from "@/app/hooks";
import React from "react";

const PrintIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 9V2h12v7M6 18h12v4H6v-4zm12 0V9H6v9h12zM6 14h.01"
    />
  </svg>
);

const PrintButton = () => {
  const previewMode = useAppSelector((state) => state.preview.enabled);
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="no-print editor__publish-button text-blue-600 hover:text-blue-800 transition-all flex flex-col items-center gap-1"
      title="Print"
    >
      <PrintIcon />
      <span className="text-xs font-medium">"Print"</span>
    </button>
  );
};

export default PrintButton;
