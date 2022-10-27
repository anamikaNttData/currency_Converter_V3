// ====================================================
// IMPORTS

import { createSlice } from "@reduxjs/toolkit";

// ====================================================
// Initial state

let initialState = {
  conversionRate: 0,
  codes: [],
};

// ====================================================
// Reducer

export const dataSlice = createSlice({
  name: "currencyConverter",
  initialState,
  reducers: {
    setConversionResult: (state, action) => {
      state.conversionRate = action.payload.conversion_rate;
    },
    setcodes: (state, action) => {
      state.codes = action.payload.supported_codes;
    },
  },
});

// ====================================================
// Exports

export const { setConversionResult, setcodes } = dataSlice.actions;
export default dataSlice.reducer;
