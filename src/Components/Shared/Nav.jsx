import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/usersSlice'
import { Outlet, useNavigate } from 'react-router-dom'

const Nav = ({}) => {
  const admin = localStorage.getItem('role') === 'admin'
  const dispatch = useDispatch()
  const nav = useNavigate()

  const handleLogout = useCallback(() => {
    dispatch(clearUser())
    nav('/login')
  }, [dispatch, nav])

  return (
    <>
      <nav
        className='z-10 bg-button fixed top-0 left-0 w-full px-3 py-3 flex items-center justify-between border-b drop-shadow-lg'
        style={{ zIndex: 10, height: '64px' }}
      >
        <div
          className='text-2xl font-bold text-input hover-transition hover:cursor-pointer'
          onClick={() => {
            admin ? nav('/') : nav('/posts')
          }}
        >
          SoftBlogs
        </div>

        <button
          onClick={handleLogout}
          className='bg-inherit hover-transition text-input hover:bg-input hover:text-button px-4 py-2 rounded-md transition-all'
        >
          Logout
        </button>
      </nav>

      <div style={{ paddingTop: '64px' }}>
        {' '}
        <Outlet />
      </div>
    </>
  )
}

export default React.memo(Nav)
