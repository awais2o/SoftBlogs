import React, { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ReadBlog = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { blog } = location.state || {}

  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchBlogs = useCallback(() => {
    setLoading(true)
    setError('')

    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: { page: 1, limit: 20 }
      })
      .then(response => {
        setBlogs(response.data?.posts || [])
      })
      .catch(err => {
        setError('Error fetching blogs')
        toast(err.response?.data?.message || 'Error Finding Blogs')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const handleBlogClick = useCallback(
    (blogId, otherBlog) => {
      navigate(`/read-post/${blogId}`, { state: { blog: otherBlog } })
    },
    [navigate]
  )

  const memoizedBlogList = useMemo(
    () =>
      blogs.length > 0
        ? blogs.map(otherBlog => (
            <li
              key={otherBlog._id}
              className='mb-2 cursor-pointer hover:underline'
              onClick={() => handleBlogClick(otherBlog._id, otherBlog)}
            >
              {otherBlog.title}
            </li>
          ))
        : !loading && <li>No other blogs available</li>,
    [blogs, loading, handleBlogClick]
  )

  if (!blog) {
    return <div>No blog data found.</div>
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div className='lg:col-span-3'>
          <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className='prose max-w-none'
          ></div>
        </div>

        <div className='hidden lg:block lg:col-span-1 p-4 bg-input text-inputtext rounded-md h-[75vh] overflow-y-auto border border-button'>
          <h2 className='text-xl font-semibold mb-4'>Other Blogs</h2>

          {loading && <p>Loading blogs...</p>}
          {error && <p className='text-red-500'>{error}</p>}

          <ul>{memoizedBlogList}</ul>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ReadBlog)
