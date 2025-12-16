"use client"

import axios from "axios"
import { BASEURL } from "../../config"

export default function InputBoxComponent({ title, setTitle, description, setDescription, fetchData, setFetchData }) {
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const sendData = async () => {
    try {
      const tok = localStorage.getItem("token")
      console.log(tok)

      const response = await axios.post(
        `${BASEURL}/add-todo`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            token: tok,
          },
        },
      )

      if (response.data.message == "added-todo") {
        alert("todo added successfully")
        setTitle("")
        setDescription("")
        setFetchData(!fetchData)
      } else if (response.data.message == "token missing") {
        alert("invalid token, please login again")
      } else {
        alert("internal server error")
      }
    } catch (e) {
      alert("server busy")
    }

    setFetchData(!fetchData)
  }
  return (
    <div className="my-40 max-w-md w-full mx-auto space-y-6 p-8 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2">Add New Todo</h2>
        <p className="text-gray-600">Create a new task to stay organized</p>
      </div>
      <input
        type="text"
        placeholder="Add title"
        onChange={handleTitle}
        value={title}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-black placeholder-gray-400"
      />
      <br />
      <input
        type="text"
        placeholder="Add description"
        value={description}
        onChange={handleDescription}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-black placeholder-gray-400"
      />
      <br />
      <button
        onClick={sendData}
        className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Add
      </button>
    </div>
  )
}
