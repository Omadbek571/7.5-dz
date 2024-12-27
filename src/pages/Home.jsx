import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../store/counterSlice'

function Home() {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const handleInc = () => {
    dispatch(increment(1))
  }
  const handleDec = () => {
    dispatch(decrement(1))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h3 className="text-3xl font-bold text-gray-700 mb-4">{counter}</h3>
      <div className="flex space-x-4">
        <button 
          onClick={handleInc} 
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          +
        </button>
        <button 
          onClick={handleDec} 
          className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
        >
          -
        </button>
      </div>
    </div>
  )
}

export default Home
