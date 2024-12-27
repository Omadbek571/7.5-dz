import React, { Children, useEffect } from 'react'
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import MyLayots from './layouts/MyLayots'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    const tokenOlish = localStorage.getItem("token")

    if (tokenOlish) {
      setToken(tokenOlish)
    } else if (!location.pathname.includes("/register")) {
      navigate("/login");
    }

  }, [location.pathname, navigate])

  function PrevateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login")

      return null
    }

    return children
  }


  return (
    <Routes>
      <Route path="/" element={<PrevateRoute isAuth={!!token}><MyLayots><Home /></MyLayots></PrevateRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
