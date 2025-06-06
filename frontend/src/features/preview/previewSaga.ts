import { takeLatest, put } from "redux-saga/effects";
import { togglePreviewMode } from "./previewSlice";

function* handleTogglePreview() {
  console.log("Preview mode toggled!");
  // You can add analytics or save preference here
}

export default function* previewSaga() {
  yield takeLatest(togglePreviewMode.type, handleTogglePreview);
}
