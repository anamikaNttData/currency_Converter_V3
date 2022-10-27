// ====================================================
// Imports
// Main

import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import { combineReducers } from "redux";
import dataSlice from "./components/dataSlice";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas/convertCurrencySaga";
// ====================================================
// CombineReducers

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

let reducers = combineReducers({
  app: appReducer,
  data: dataSlice,
});
// ====================================================
// Store

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(saga);
