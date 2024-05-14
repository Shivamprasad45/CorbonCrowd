import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from "../Featuers/Data/DataSlice";
export const store = configureStore({
  reducer: {
    ItemReduce: ItemSlice,
  },
});
