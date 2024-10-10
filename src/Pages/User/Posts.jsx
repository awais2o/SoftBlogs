import React, { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PaginationComponent from '../../Components/Shared/PaginationComponent'
import toast from 'react-hot-toast'

const Posts = () => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchBlogs = useCallback(() => {
    setLoading(true)
    setError('')

    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: { page, limit }
      })
      .then(response => {
        setBlogs(response.data?.posts || [])
        setTotalPages(response.data?.totalPages || 1)
      })
      .catch(err => {
        toast(err.response?.data?.message || 'Error Fetching Blogs')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, limit])

  useEffect(() => {
    fetchBlogs()
  }, [page, limit, fetchBlogs])

  const handlePageChange = useCallback(newPage => {
    setPage(newPage)
  }, [])

  const handleLimitChange = useCallback(e => {
    setLimit(parseInt(e.target.value, 10))
    setPage(1)
  }, [])

  const pageSizeOptions = useMemo(() => [5, 10, 15, 20], [])

  const handleBlogClick = useCallback(
    blog => {
      navigate(`/read-post/${blog._id}`, { state: { blog, blogs } })
    },
    [navigate]
  )

  const blogCards = useMemo(
    () =>
      blogs.map(blog => (
        <li
          key={blog._id}
          className='shadow-md p-4 rounded-md bg-cardv2 hover:bg-card cursor-pointer'
          onClick={() => handleBlogClick(blog)}
        >
          <h2 className='text-xl font-semibold'>{blog.title}</h2>
          <p>
            {blog.content.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 100)}...
          </p>
        </li>
      )),
    [blogs, handleBlogClick]
  )

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Blogs</h1>

        <div className='flex items-center'>
          <label htmlFor='pageSize' className='mr-2 text-sm font-medium'>
            Page Size:
          </label>
          <select
            id='pageSize'
            value={limit}
            onChange={handleLimitChange}
            className='bg-input border border-gray-300 text-inputtext py-2 px-3 rounded-md'
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {blogCards}
      </ul>

      <PaginationComponent
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Posts
