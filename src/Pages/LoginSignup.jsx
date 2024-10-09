import axios from 'axios'
import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/usersSlice'

const LoginSignup = ({ login }) => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setInput({ username: '', password: '', confirmPassword: '', role: 'user' })
    setError('')
  }, [login])

  const handleSubmit = e => {
    e.preventDefault()

    if (input.password.length < 8) {
      setError('Password must be at least 8 characters long!')
      return
    }

    if (!login && input.password !== input.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    setError('')

    const updatedInput = {
      ...input,
      role: isAdmin ? 'admin' : 'user'
    }

    if (login) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          username: updatedInput.username,
          password: updatedInput.password
        })
        .then(response => {
          localStorage.setItem('token', response?.data?.token)
          localStorage.setItem('role', response?.data?.user?.role)
          dispatch(setUser(response?.data?.user))
        })
        .catch(error => {
          console.error('API Error:', error?.response?.data || error?.message)
          setError(error.response?.data?.message || 'Something went wrong!')
        })
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          username: updatedInput.username,
          password: updatedInput.password,
          role: updatedInput.role
        })
        .then(response => {
          nav('/login')
        })
        .catch(error => {
          console.error('API Error:', error.response?.data || error.message)
          setError(error.response?.data?.message || 'Something went wrong!')
        })
    }
    setInput({ username: '', password: '', confirmPassword: '', role: 'user' })
    setError('')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const toggleCheckbox = () => {
    setIsAdmin(!isAdmin)
  }
  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-card p-8 rounded-lg shadow-xl w-full max-w-md md:max-w-md lg:max-w-3xl flex flex-col lg:flex-row mx-auto'>
          {/* Left: Form*/}
          <div className='w-full md:w-full lg:w-1/2 p-6'>
            <h2 className='text-2xl font-bold text-center mb-6'>
              {login ? 'Login' : 'Signup'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  className='mt-1 p-2 w-full border border-gray-300 bg-input text-inputtext rounded-md'
                  placeholder='Enter your username'
                  value={input.username}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  className='mt-1 p-2 w-full border border-gray-300 bg-input text-inputtext rounded-md'
                  placeholder='Enter your password'
                  value={input.password}
                  onChange={handleChange}
                />
              </div>

              {!login && (
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    className='mt-1 p-2 w-full border border-gray-300 bg-input text-inputtext rounded-md'
                    placeholder='Confirm your password'
                    value={input.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

              {/* Custom div acting as a checkbox */}
              {!login && (
                <div className='mb-4 flex items-center'>
                  <div
                    className={`w-5 h-5 inline-flex items-center justify-center border-2 border-gray-300 rounded-sm cursor-pointer ${
                      isAdmin ? 'bg-inputtext' : 'bg-white'
                    }`}
                    onClick={toggleCheckbox}
                  >
                    {isAdmin && <Check className='text-white w-4 h-4' />}{' '}
                    {/* Only show check if isAdmin is true */}
                  </div>
                  <span
                    className='ml-2 text-gray-700 cursor-pointer'
                    onClick={toggleCheckbox}
                  >
                    Is Admin
                  </span>
                </div>
              )}

              <button
                type='submit'
                className='w-full bg-button text-white py-2 rounded-md hover:bg-hoverbutton transition-colors'
              >
                Submit
              </button>
              <p
                className='text-inputtext hover:underline mt-2 text-center cursor-pointer'
                onClick={() => {
                  login ? nav('/signup') : nav('/login')
                }}
              >
                {login
                  ? 'Need an account? Sign up here.'
                  : 'Already have an account? Sign in here.'}
              </p>
            </form>
          </div>

          {/* Right */}
          <div className='hidden lg:flex w-1/2 p-6 bg-complementary rounded-lg items-center justify-center'>
            <div className='text-center'>
              <h3 className='text-4xl font-bold mb-4'>Welcome!</h3>
              <p className='text-lg mb-4'>
                Your words hold the power to inspire, ignite, and transform.
                Share your story, and the world will listen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginSignup
