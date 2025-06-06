import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import exampleReducer from "../features/example/exampleSlice";
import appReducer from "../features/app/appSlice";
import previewReducer from "../features/preview/previewSlice";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    app: appReducer,
    preview: previewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
