import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { editCourse, deleteCourse } from '../redux/Add'

const HandleAdded = () => {
  // حالة عشان البحث
  const [search, setSearch] = useState('')
  // حالة عشان تخزن الـ ID بتاع الكورس اللي بيتعدل
  const [editingId, setEditingId] = useState(null)
  // حالة عشان تخزن تفاصيل الكورس اللي بيتعدل
  const [editedCourse, setEditedCourse] = useState({})
  // جلب الكورسات من الـ Redux store
  const courses = useSelector((state) => state.Add.courses)
  // دالة dispatch عشان تشغل الـ Redux actions
  const dispatch = useDispatch()
  const [serverCourses, setServerCourses] = useState([]) // حالة لتخزين بيانات الكورسات من السيرفر

  // جلب البيانات من السيرفر عند تحميل الصفحة
  useEffect(() => {
      axios.get('http://localhost:4004/coursat') // استبدل الرابط بعنوان API الخاص بك
      .then(res => {
        setServerCourses(res.data) // تخزين البيانات في الحالة
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  // دمج بيانات السيرفر مع بيانات Redux
  const allCourses = [...serverCourses, ...courses]

  // فلترة الكورسات بناءً على البحث
  const filteredCourses = allCourses.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.instructor.toLowerCase().includes(search.toLowerCase())
  )
  
  // دالة عشان تبدأ تعديل الكورس
  const handleEdit = (course) => {
    setEditingId(course.id) // تخزين الـ ID بتاع الكورس اللي بيتعدل
    setEditedCourse(course) // تخزين تفاصيل الكورس في الحالة
  }

  // دالة عشان تحفظ التعديلات على الكورس
  const handleSave = () => {
    dispatch(editCourse({ id: editingId, updatedCourse: editedCourse })) // تشغيل الـ action بتاع التعديل
    setEditingId(null) // إعادة ضبط حالة التعديل
  }

  // دالة عشان تتعامل مع التغيرات في الحقول أثناء التعديل
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedCourse({ ...editedCourse, [name]: value }) // تحديث حالة الكورس اللي بيتعدل
  }

  // دالة عشان تمسح كورس
  const del = (id) => {
    dispatch(deleteCourse(id)) // تشغيل الـ action بتاع المسح
  }

  return (
    <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen py-4 overflow-x-auto">
      {/* عنوان الصفحة */}
      {/* حقل البحث */}
      <input
        type="text"
        placeholder=" Search for a course..."
        className="w-11/12 sm:w-96 p-3 mb-4 rounded-lg shadow-md 
        text-center focus:outline-none focus:ring-2 bg-white focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // تحديث حالة البحث لما المستخدم يكتب
      />
        <h2 className="text-3xl font-bold mb-4 text-white text-center">Course List</h2>
      <div className="flex justify-center overflow-x-auto">
        {/* جدول عرض الكورسات */}
        <table className="shadow-lg rounded-lg w-full sm:w-auto">
          <thead>
            <tr className="bg-orange-500 text-white text-center">
              {/* عناوين الجدول */}
              <th className="border p-3">Title</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Instructor Name</th>
              <th className="border p-3">Duration</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* عرض الكورسات بعد الفلترة */}
            {filteredCourses.map((k) => (
              <tr key={k.id} className="border bg-gray-100">
                {editingId === k.id ? (
                  // عرض الحقول للتعديل لو الكورس بيتعدل
                  <>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="title"
                        value={editedCourse.title}
                        onChange={handleChange} // تحديث عنوان الكورس
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="description"
                        value={editedCourse.description}
                        onChange={handleChange} // تحديث وصف الكورس
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="instructor"
                        value={editedCourse.instructor}
                        onChange={handleChange} // تحديث اسم المدرب
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        name="duration"
                        value={editedCourse.duration}
                        onChange={handleChange} // تحديث مدة الكورس
                        className="w-full p-1 border rounded text-sm"
                      />
                    </td>
                    <td className="p-3 flex justify-center align-middle gap-2">
                      {/* زرار الحفظ */}
                      <button
                        onClick={handleSave} // حفظ التعديلات على الكورس
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer transition text-sm"
                      >
                        Save
                      </button>
                      {/* زرار الإلغاء */}
                      <button
                        onClick={() => setEditingId(null)} // إلغاء التعديل
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer transition text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // عرض تفاصيل الكورس لو مش بيتعدل
                  <>
                    <td className="border p-3 text-sm">{k.title}</td>
                    <td className="border p-3 text-sm">{k.description}</td>
                    <td className="border p-3 text-sm">{k.instructor}</td>
                    <td className="border p-3 text-sm">{k.duration}</td>
                    <td className="p-3 flex justify-center align-middle gap-2">
                      {/* زرار التعديل */}
                      <button
                        onClick={() => handleEdit(k)} // بدء تعديل الكورس
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer transition text-sm"
                      >
                        Modify
                      </button>
                      {/* زرار المسح */}
                      <button
                        onClick={() => del(k.id)} // مسح الكورس
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