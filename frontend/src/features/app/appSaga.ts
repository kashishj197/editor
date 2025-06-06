import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchAppData,
  setAppData,
  setLoading,
  updateGlobalBlock,
} from "./appSlice";
import axios from "../../utils/axiosInstance";
import {
  Page,
  Theme,
  BlockDefinition,
  Layout,
} from "../../utils/models/models";

function* handleFetchAppData(action: { type: string; payload: string }) {
  try {
    yield put(setLoading(true));

    const pathname = action.payload === "/" ? "/home" : action.payload;

    const [page, theme, blockDefs, layouts]: [
      Page,
      Theme,
      BlockDefinition[],
      Layout[]
    ] = yield all([
      call(() => axios.get<Page>(`page/url?url=${pathname}`)),
      call(() => axios.get<Theme>("theme/683bcf9e2c6e9cabed223e8c")),
      call(() => axios.get<BlockDefinition[]>("block")),
      call(() => axios.get<Layout[]>("layout")),
    ]);

    yield put(
      setAppData({ page, theme, blockDefinitions: blockDefs, layouts })
    );
  } catch (e) {
    console.error("App init error:", e);
  } finally {
    yield put(setLoading(false));
  }
}

function* handleUpdateGlobalBlock(action: { type: string; payload: any }) {
  try {
    const updated: { data: any } = yield call(() =>
      axios.put(`/global/${action.payload.id}/data`, action.payload)
    );
    yield put(updateGlobalBlock(updated.data));
  } catch (err) {
    console.error("Failed to update global block", err);
  }
}

export function* appSaga() {
  yield takeLatest(fetchAppData.type, handleFetchAppData);
  yield takeLatest(updateGlobalBlock.type, handleUpdateGlobalBlock);
}
