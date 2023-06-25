import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "../Sciles/HomeSlice";

const store = configureStore({
  reducer: {
    home: HomeSlice.reducer,
  },
});

export default store;
