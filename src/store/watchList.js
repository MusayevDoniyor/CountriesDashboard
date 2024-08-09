import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countriesInWatchList: [
    {
      cca3: "UZB",
      flags: { svg: "https://flagcdn.com/uz.svg" },
      name: { common: "Uzbekistan" },
    },
    {
      cca3: "PSE",
      flags: { svg: "https://flagcdn.com/ps.svg" },
      name: { common: "Palestine" },
    },
    {
      cca3: "RUS",
      flags: { svg: "https://flagcdn.com/ru.svg" },
      name: { common: "Russia" },
    },
    {
      cca3: "DEU",
      flags: { svg: "https://flagcdn.com/de.svg" },
      name: { common: "Germany" },
    },
  ],
  status: "idle",
  error: null,
};

const WatchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addWatchListStart: (state) => {
      state.status = "loading";
    },
    addWatchListSuccess: (state, action) => {
      state.status = "succeeded";
      state.countriesInWatchList = action.payload;
    },
    addWatchListFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addCountryToWatchList: (state, action) => {
      const country = action.payload;
      if (!state.countriesInWatchList.find((c) => c.cca3 === country.cca3)) {
        state.countriesInWatchList.push(country);
      }
    },
    removeCountryFromWatchList: (state, action) => {
      state.countriesInWatchList = state.countriesInWatchList.filter(
        (country) => country.cca3 !== action.payload.cca3
      );
    },
  },
});

export const {
  addWatchListStart,
  addWatchListSuccess,
  addWatchListFailure,
  addCountryToWatchList,
  removeCountryFromWatchList,
} = WatchListSlice.actions;

export default WatchListSlice.reducer;
