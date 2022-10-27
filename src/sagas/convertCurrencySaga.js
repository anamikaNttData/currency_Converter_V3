// ====================================================
// IMPORTS
import { all, fork, call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { sagaActions } from "./sagaActions";
import { setcodes, setConversionResult } from "../components/dataSlice";
// ====================================================
// Instance

const api = {
  base: "https://v6.exchangerate-api.com/v6/4b731e31000b8ad18c0f28f8",
};

// function uses axios to fetch data from our api
let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data,
  });
};
// ====================================================
// Requests
function* fetchConvertCurrency(from) {
  try {
    let result = yield call(() =>
      callAPI({
        url: `${api.base}/pair/${from.from}/${from.to}`,
      })
    );
    yield put(setConversionResult(result.data));
  } catch (e) {}
}

function* watchConvertCurrency() {
  yield takeEvery(sagaActions.FETCH_CONVERT_CURRENCY, fetchConvertCurrency);
}

// ====================================================
// Request
function* getCodes() {
  try {
    let result = yield call(() =>
      callAPI({
        url: `${api.base}/codes`,
      })
    );
    yield put(setcodes(result.data));
  } catch (e) {}
}

function* watchGetCodes() {
  yield takeEvery(sagaActions.GET_CODES, getCodes);
}

export default function* rootSaga() {
  yield all([fork(watchGetCodes), fork(watchConvertCurrency)]);
}
