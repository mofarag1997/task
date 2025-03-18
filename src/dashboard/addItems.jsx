import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCourse } from '../redux/Add'

const AddItems = () => {
  const [formData, setFormData] = useState({ title: '', description: '', instructor: '', duration: '' })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    const { title, description, instructor, duration } = formData
    if (title && description && instructor && duration) {
      dispatch(addCourse(formData))
      setFormData({ title: '', description: '', instructor: '', duration: '' })
    }
  }

  return (
    <div className=' bg-gradient-to-r pb-10 from-blue-500 to-purple-600 w-screen text-white'>
      <h1 className='text-center text-4xl pt-4 font-bold'>Dashboard</h1>
      <div className='flex justify-center items-center mx-auto mt-2 gap-4 flex-wrap'>
        {['title', 'description', 'instructor', 'duration'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className='bg-white text-gray-800 rounded-lg p-3 text-center outline-none shadow-md focus:ring-2 focus:ring-blue-400 transition-all w-64'
          />
        ))}
      </div>
      <div className='flex justify-center items-center mt-4 gap-4'>
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