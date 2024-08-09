import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import watchListReducer from "./watchList";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    watchList: watchListReducer,
  },
});

export default store;
