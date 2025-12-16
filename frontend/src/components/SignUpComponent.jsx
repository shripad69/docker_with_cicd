"use client"

import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { BASEURL } from "../../config"

export default function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  function updateUsername(e) {
    setUsername(e.target.value)
  }

  function updatePassword(e) {
    setPassword(e.target.value)
  }

  const sendInfo = async () => {
    setLoading(true)

    const responce = await axios.post(`${BASEURL}/signup`, {
      username: username,
      password: password,
    })
    setLoading(false)

    if (responce.data.message == "Username already exits") {
      alert("Username already exits")
    } else if (responce.data.message == "Enter all the details...") {
      alert("Enter all the details...")
    } else {
      alert("SignUp done, Please Login !")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
          <p className="text-gray-600">Join us today and get started</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              onChange={updateUsername}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-black placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              onChange={updatePassword}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-black placeholder-gray-400"
            />
          </div>

          <button
            disabled={loading}
            onClick={sendInfo}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-black font-medium hover:underline transition-all duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
