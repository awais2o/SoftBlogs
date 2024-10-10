import React, { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../Components/Admin/PostCard'
import PaginationComponent from '../../Components/Shared/PaginationComponent'
import toast from 'react-hot-toast'

const Dashboard = React.memo(() => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchBlogs = useCallback(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setError('No token found. Please log in.')
      return
    }

    setLoading(true)
    setError('')

    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: { page, limit },
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setBlogs(response.data?.posts || [])
        setTotalPages(response.data?.totalPages || 1)
      })
      .catch(err => {
        toast(err.response?.data?.message || 'Error Fetching Posts')
      })
      .finally(() => setLoading(false))
  }, [page, limit])

  useEffect(() => {
    fetchBlogs()
  }, [page, limit, fetchBlogs])

  const memoizedPostCards = useMemo(
    () =>
      blogs.map(blog => (
        <PostCard key={blog?._id} blog={blog} refreshBlogs={fetchBlogs} />
      )),
    [blogs, fetchBlogs]
  )

  const pageSizeOptions = useMemo(() => [5, 10, 15, 20], [])
  const handleAddPost = useCallback(() => navigate('/add-post'), [navigate])

  const handleLimitChange = useCallback(e => {
    setLimit(parseInt(e.target.value, 10))
    setPage(1)
  }, [])

  const handlePageChange = useCallback(newPage => setPage(newPage), [])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>My Blogs</h1>

        <div className='flex items-center space-x-4'>
          <div className='flex items-center'>
            <label htmlFor='pageSize' className='mr-2'>
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

          <button
            onClick={handleAddPost}
            className='flex items-center bg-button text-white py-2 px-4 rounded-md hover:bg-hoverbutton transition-colors'
          >
            <Plus className='mr-2' /> Add
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <ul>{memoizedPostCards}</ul>

      <PaginationComponent
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
})

export default Dashboard
