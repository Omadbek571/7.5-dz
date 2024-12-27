import React from 'react'
import { useNavigate } from 'react-router-dom'

function MyLayots({ children }) {

    const navigate = useNavigate()

    function handleLogout(e) {
        e.preventDefault();
        navigate("/login")

        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="shadow-lg">
                <div className="navbar bg-base-100 border-b-2 border-gray-300">
                    <div className="flex-1">
                        <a href="/" className="btn btn-ghost text-xl font-semibold text-blue-600">
                            Home
                        </a>
                    </div>
                    <div className="flex-none">
                        <button 
                            onClick={handleLogout} 
                            className="btn btn-ghost text-xl font-semibold text-red-600 hover:text-red-800"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4">{children}</div>
        </div>
    );
}

export default MyLayots
