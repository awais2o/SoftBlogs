import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  const handleGoHome = () => {
    role === 'admin' ? navigate('/') : navigate('/posts')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-primary'>
      <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
      <h2 className='text-2xl font-semibold text-gray-600 mb-8'>
        Page Not Found
      </h2>
      <p className='text-lg text-gray-500 mb-6'>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleGoHome}
        className='bg-button text-white py-2 px-4 rounded-md hover:bg-hoverbutton transition-colors'
      >
        Go Home
      </button>
    </div>
  )
}

export default NotFound
