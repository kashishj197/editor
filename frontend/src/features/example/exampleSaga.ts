import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchData, setData } from './exampleSlice';

function* handleFetch() {
  try {
    const result: string[] = yield call(() => Promise.resolve(['Block 1', 'Block 2']));
    yield put(setData(result));
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

export default function* exampleSaga() {
  yield takeLatest(fetchData.type, handleFetch);
}