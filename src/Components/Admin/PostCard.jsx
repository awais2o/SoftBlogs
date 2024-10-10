import React, { useState, useCallback } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const PostCard = React.memo(({ blog, refreshBlogs }) => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleDelete = useCallback(() => {
    const token = localStorage.getItem('token')

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this post? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5D3A1A',
      cancelButtonColor: '#D9BBA9',
      confirmButtonText: 'Yes, delete it!',
      background: '#F5F5DC'
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/posts/${blog._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your post has been deleted.',
              icon: 'success',
              background: '#F5F5DC',
              confirmButtonColor: '#5D3A1A'
            })

            refreshBlogs()
          })
          .catch(err => {
            setError('Error deleting post ')
            toast(err.response?.data?.message || 'Error submitting post')
          })
      }
    })
  }, [blog._id, refreshBlogs])

  const handleEdit = useCallback(
    event => {
      event.stopPropagation()
      navigate('/edit-post', { state: { blog } })
    },
    [blog, navigate]
  )

  const handleBlogClick = useCallback(
    blog => {
      navigate(`/read-post/${blog._id}`, { state: { blog } })
    },
    [navigate]
  )

  return (
    <li
      className='mb-4 py-3 px-3 bg-cardv2 rounded-md hover:bg-card cursor-pointer'
      onClick={() => {
        handleBlogClick(blog)
      }}
    >
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>{blog.title}</h2>

        <div className='flex space-x-3'>
          <Trash2
            className='text-button cursor-pointer'
            onClick={e => {
              e.stopPropagation()
              handleDelete()
            }}
          />
          <Pencil className='text-button cursor-pointer' onClick={handleEdit} />
        </div>
      </div>

      <p>{blog.content.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 100)}...</p>

      {error && <p className='text-red-500'>{error}</p>}
    </li>
  )
})

export default PostCard
