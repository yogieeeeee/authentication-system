import React, {useState, useEffect} from "react"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import DashboardPage from "@/pages/DashboardPage"

const App = () => {
  const [currentPage, setCurrentPage] = useState("login")
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const baseURL = import.meta.env.VITE_API_ENDPOINT
  const apiService = {
    // For handle register
    handleRegister: async () => {
      if (
        !registerForm.username ||
        !registerForm.email ||
        !registerForm.password
      ) {
        setError("Please fill in all fields")
        return
      }

      setLoading(true)
      setError("")
      setSuccess("")

      try {
        const response = await fetch(`${baseURL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(registerForm)
        })

        const data = await response.json()

        if (response.ok) {
          setSuccess("Registration successful! Please login.")
          setRegisterForm({username: "", email: "", password: ""})
          setTimeout(() => {
            setCurrentPage("login")
            setSuccess("")
          }, 2000)
        } else {
          setError(data.message || "Registration failed")
        }
      } catch (err) {
        setError("Network error. Please try again.")
      } finally {
        setLoading(false)
      }
    },

    // For handle login
    handleLogin: async () => {
      if (!loginForm.email || !loginForm.password) {
        setError("Please fill in all fields")
        return
      }

      setLoading(true)
      setError("")

      try {
        const response = await fetch(`${baseURL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginForm)
        })

        const data = await response.json()

        if (response.ok && data.accessToken) {
          setToken(data.accessToken)
          localStorage.setItem("token", data.accessToken)
          setLoginForm({email: "", password: ""})
          apiService.fetchDashboard(data.accessToken)
        } else {
          setError(data.message || "Login failed")
        }
      } catch (err) {
        setError("Network error. Please try again.")
      } finally {
        setLoading(false)
      }
    },

    // For get dashboard with access token
    fetchDashboard: async authToken => {
      setLoading(true)
      try {
        const response = await fetch(`${baseURL}/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken || token}`,
            "Content-Type": "application/json"
          }
        })

        const data = await response.json()

        if (response.ok) {
          const userData = {username: data.username, email: data.email}
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
          setCurrentPage("dashboard")
        } else {
          setError("Failed to load dashboard")
          apiService.handleLogout()
        }
      } catch (err) {
        setError("Network error. Please try again.")
        handleLogout()
      } finally {
        setLoading(false)
      }
    },
    handleLogout: () => {
      setUser(null)
      setToken(null)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setCurrentPage("login")
      setError("")
      setSuccess("")
    }
  }

  // Form states
  const [loginForm, setLoginForm] = useState({email: "", password: ""})
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
      setCurrentPage("dashboard")
    }
  }, [])

  // Render current page
  switch (currentPage) {
    case "register":
      return (
        <RegisterPage
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          handleRegister={apiService.handleRegister}
          loading={loading}
          error={error}
          success={success}
          setCurrentPage={setCurrentPage}
        />
      )
    case "dashboard":
      return (
        <DashboardPage
          user={user}
          loading={loading}
          handleLogout={apiService.handleLogout}
        />
      )
    default:
      return (
        <LoginPage
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          handleLogin={apiService.handleLogin}
          loading={loading}
          error={error}
          setCurrentPage={setCurrentPage}
        />
      )
  }
}

export default App
