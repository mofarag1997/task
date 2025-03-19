import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCourse } from '../redux/Add'
import axios from 'axios'

const AddItems = () => {
  // حالة لتخزين بيانات النموذج
  const [formData, setFormData] = useState({ title: '', description: '', instructor: '', duration: '' })
  const dispatch = useDispatch()

  // دالة لتحديث بيانات النموذج عند الكتابة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    axios.get("http://localhost:4004/coursat")
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }, [])

  // دالة لإضافة كورس جديد
  const handleAdd = () => {
    const { title, description, instructor, duration } = formData
    if (title && description && instructor && duration) {
      dispatch(addCourse(formData)) // تشغيل الـ action لإضافة الكورس
      setFormData({ title: '', description: '', instructor: '', duration: '' }) // إعادة ضبط النموذج
    }
  }

  return (
    <div className=' bg-gradient-to-r pb-10 from-blue-500 to-purple-600 w-screen text-white'>
      {/* عنوان الصفحة */}
      <h1 className='text-center text-4xl pt-4 font-bold'>Dashboard</h1>
      <div className='flex justify-center items-center mx-auto mt-2 gap-4 flex-wrap'>
        {/* حقول إدخال بيانات الكورس */}
        {['title', 'description', 'instructor', 'duration'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // تحويل أول حرف لكابيتال
            value={formData[field]}
            onChange={handleChange} // تحديث بيانات النموذج
            className='bg-white text-gray-800 rounded-lg p-3 text-center outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all w-64'
          />
        ))}
      </div>
      <div className='flex justify-center items-center mt-4 gap-4'>
        {/* زرار الإضافة */}
        <button
          onClick={handleAdd}
          className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6 cursor-pointer shadow-md transition-all'
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default AddItems