import React, { useState, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const PostEditor = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { blog } = location.state || {}

  const [title, setTitle] = useState(blog?.title || '')
  const [content, setContent] = useState(blog?.content || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const heading = useMemo(() => (blog ? 'Edit Post' : 'Add Post'), [blog])

  const handleTitleChange = useCallback(e => setTitle(e.target.value), [])

  const handleContentChange = useCallback(value => setContent(value), [])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      setLoading(true)
      setError('')

      const postData = { title, content }

      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const request = blog
        ? axios.put(
            `${import.meta.env.VITE_API_URL}/posts/${blog._id}`,
            postData,
            config
          )
        : axios.post(`${import.meta.env.VITE_API_URL}/posts`, postData, config)

      request
        .then(() => navigate('/'))
        .catch(err => {
          toast(err.response?.data?.message || 'Error Editing Blog')
        })
        .finally(() => setLoading(false))
    },
    [title, content, blog, navigate]
  )

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>{heading}</h1>

      {error && <p className='text-red-500'>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            value={title}
            onChange={handleTitleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md bg-input text-inputtext'
            placeholder='Enter post title'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme='snow'
            className='border border-gray-300 rounded-md text-inputtext'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-button text-white py-2 px-4 rounded-md hover:bg-hoverbutton transition-colors disabled:bg-disabledbutton'
        >
          {loading ? 'Submitting...' : blog ? 'Update Post' : 'Add Post'}
        </button>
      </form>
    </div>
  )
}

export default PostEditor
