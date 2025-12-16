// "use client"
import axios from "axios"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../../config"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function updateUsername(e) {
    setUsername(e.target.value)
  }

  function updatePassword(e) {
    setPassword(e.target.value)
  }

  const sendInfo = async () => {
    const responce = await axios.post(`${BASEURL}/signin`, {
      username: username,
      password: password,
    })
    console.log(responce.data.userId)

    if (responce.data.message == "loggged in") {
      localStorage.setItem("userId", responce.data.userId)
      localStorage.setItem("token", responce.data.token)
      alert("you are logged in...")
      navigate("/home")
    } else if (responce.data.message == "invalid credentials") {
      alert("invalid credentials")
    } else if (responce.data.message == "internal server error") {
      alert("internal server error")
    } else {
      alert("Enter all the details")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-2">Sign In</h2>
          <p className="text-gray-600">Welcome back to your account</p>
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
            onClick={sendInfo}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Sign In
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-black font-medium hover:underline transition-all duration-200">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
