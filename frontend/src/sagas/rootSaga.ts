import { all } from "redux-saga/effects";
import exampleSaga from "../features/example/exampleSaga";
import { appSaga } from "../features/app/appSaga";
import previewSaga from "../features/preview/previewSaga";

export default function* rootSaga() {
  yield all([exampleSaga(), appSaga(), previewSaga()]);
}
