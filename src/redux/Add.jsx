import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courses: [
    { id: 1, title: "React Basics", description: "Learn React from scratch", instructor: "Mohamed Farag", duration: "4 weeks" },
  ],
}

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload)
    },
    editCourse: (state, action) => {
      const { id, updatedCourse } = action.payload
      state.courses = state.courses.map((course) =>
        course.id === id ? { ...course, ...updatedCourse } : course
      )
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((course) => course.id !== action.payload)
    },
  },
})

export const { addCourse, editCourse, deleteCourse } = courseSlice.actions
export default courseSlice.reducer
