import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  function validate() {
    if (usernameRef.current.value.trim().length < 3) {
      alert("Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak!");
      usernameRef.current.focus();
      return false;
    }

    return true;
  }

  function handleLogin(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const loginUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    axios.post("https://auth-rg69.onrender.com/api/auth/signin", loginUser)
      .then((res) => {
        if (res.data.message === "User Not found" || res.data.message === "Invalid Password!") {
          alert(res.data.message);
        } else if (res.data.id) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data));
          alert("Login muofaqiyatlik bajarildi!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        usernameRef.current.value = "";
        passwordRef.current.value = "";
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter Username..."
            ref={usernameRef} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Enter Password..."
            ref={passwordRef} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
