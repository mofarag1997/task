import { configureStore } from "@reduxjs/toolkit"
import Add from "./Add"

export const store = configureStore({
  reducer: {
    Add: Add,
  },
})
