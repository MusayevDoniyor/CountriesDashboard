import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  status: "idle",
  error: null,
};

const CountriesSlice = createSlice({
  name: "Countries",
  initialState,
  reducers: {
    fetchCountriesStart: (state) => {
      state.status = "loading";
    },
    fetchCountriesSuccess: (state, action) => {
      state.status = "succeeded";
      state.countries = action.payload;
    },
    fetchCountriesFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
} = CountriesSlice.actions;

export default CountriesSlice.reducer;
