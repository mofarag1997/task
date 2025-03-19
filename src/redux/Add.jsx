import { createSlice } from "@reduxjs/toolkit"

// الحالة الابتدائية للكورسات
const initialState = {
  courses: [
    { id: 1, title: "React Basics", description: "Learn React from scratch", instructor: "Mohamed Farag", duration: "4 weeks" },
  ],
}

// إنشاء slice للكورسات مع تعريف reducers
const courseSlice = createSlice({
  name: "courses", // اسم الـ slice
  initialState, // الحالة الابتدائية
  reducers: {
    // دالة لإضافة كورس جديد
    addCourse: (state, action) => {
      state.courses.push(action.payload)
    },
    // دالة لتعديل كورس موجود
    editCourse: (state, action) => {
      const { id, updatedCourse } = action.payload
      state.courses = state.courses.map((course) =>
        course.id === id ? { ...course, ...updatedCourse } : course
      )
    },
    // دالة لحذف كورس
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((course) => course.id !== action.payload)
    },
  },
})

// تصدير الـ actions والـ reducer
export const { addCourse, editCourse, deleteCourse } = courseSlice.actions
export default courseSlice.reducer
