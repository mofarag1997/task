import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editCourse, deleteCourse } from '../redux/Add'

const HandleAdded = () => {
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editedCourse, setEditedCourse] = useState({})
  const courses = useSelector((state) => state.Add.courses)
  const dispatch = useDispatch()

  const filteredCourses = courses.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.instructor.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (course) => {
    setEditingId(course.id)
    setEditedCourse(course)
  }

  const handleSave = () => {
    dispatch(editCourse({ id: editingId, updatedCourse: editedCourse }))
    setEditingId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedCourse({ ...editedCourse, [name]: value })
  }

  const del = (id) => {
    dispatch(deleteCourse(id))
  }

  return (
    <div className="text-center w-full bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen py-4 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">Course List</h2>
      <input
        type="text"
        placeholder=" Search for a course..."
        className="w-96 p-3 mb-4  rounded-lg shadow-md 
        text-center focus:outline-none focus:ring-2 bg-white focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex justify-center ">
        <table className=" shadow-lg rounded-lg ">
          <thead>
            <tr className="bg-orange-500 text-white text-center">
              <th className="border p-3">Title</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Instructor Name</th>
              <th className="border p-3">Duration</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((k) => (
              <tr key={k.id} className="border bg-gray-100">
                {editingId === k.id ? (
                  <>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="title"
                        value={editedCourse.title}
                        onChange={handleChange}
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="description"
                        value={editedCourse.description}
                        onChange={handleChange}
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="instructor"
                        value={editedCourse.instructor}
                        onChange={handleChange}
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="duration"
                        value={editedCourse.duration}
                        onChange={handleChange}
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer transition text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer transition text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-3 text-sm">{k.title}</td>
                    <td className="border p-3 text-sm">{k.description}</td>
                    <td className="border p-3 text-sm">{k.instructor}</td>
                    <td className="border p-3 text-sm">{k.duration}</td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(k)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer transition text-sm"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => del(k.id)}
                        className="bg-red-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HandleAdded