import { configureStore } from "@reduxjs/toolkit"
import Add from "./Add"

// إنشاء الـ Redux store وتحديد الـ reducer اللي هيتم استخدامه
export const store = configureStore({
  reducer: {
    Add: Add, // إضافة الـ reducer الخاص بالكورسات
  },
})
