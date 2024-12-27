import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const rePasswordRef = useRef()

  const navigate = useNavigate()

  // Email validatsiyasi
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  };

  // Parol validatsiyasi
  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 6;
  };

  function validate() {
    if (usernameRef.current.value.trim().length < 3) {
      alert("Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak!")
      usernameRef.current.focus();
      return false
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Emailda hatolik mavjud")
      emailRef.current.focus()
      return false
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert("Parol kamida 6 ta belgidan, kichik harf va raqamdan iborat bo'lishi kerak")
      passwordRef.current.focus()
      return false
    }

    if (passwordRef.current.value !== rePasswordRef.current.value) {
      alert("Parollar bir biriga mos kelmadi!")
      rePasswordRef.current.focus()
      return false
    }

    return true
  }

  function handleRegister(e) {
    e.preventDefault()

    if (!validate()) return;

    const registerUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axios.post("https://auth-rg69.onrender.com/api/auth/signup", registerUser)
      .then((res) => {
        if (res.data.message === "User registered successfully!") {
          alert("Ro'yxatdan muvaffaqiyatli o'tdingiz!")
          navigate("/login")
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      })
      .finally(() => {
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        rePasswordRef.current.value = "";
      })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter Name..." 
            ref={usernameRef} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="email" 
            placeholder="Enter Email..." 
            ref={emailRef} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Enter Password..." 
            ref={passwordRef} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Enter rePassword..." 
            ref={rePasswordRef} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            REGISTER
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
