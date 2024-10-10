import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet
} from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import NotFound from './Pages/NotFound'

const LoginSignup = React.lazy(() => import('./Pages/LoginSignup'))
const Dashboard = React.lazy(() => import('./Pages/Admin/Dashboard'))
const PostEditor = React.lazy(() => import('./Pages/Admin/PostEditor'))
const Posts = React.lazy(() => import('./Pages/User/Posts'))
const ReadBlog = React.lazy(() => import('./Pages/User/ReadBlog'))
const Nav = React.lazy(() => import('./Components/Shared/Nav'))

const ProtectedRoute = ({ role }) => {
  const user = useSelector(state => state.users)
  const role_ = localStorage.getItem('role')

  if (!user || role_ !== role) {
    console.log({ user, role_, role })
    return <Navigate to='/login' />
  }

  return <Outlet />
}

function App () {
  return (
    <>
      <Toaster />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<LoginSignup login />} />
            <Route path='/signup' element={<LoginSignup />} />

            <Route element={<ProtectedRoute role='admin' />}>
              <Route element={<Nav admin />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/edit-post' element={<PostEditor />} />
                <Route path='/add-post' element={<PostEditor />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute role='user' />}>
              <Route element={<Nav />}>
                <Route path='/posts' element={<Posts />} />
              </Route>
            </Route>

            <Route element={<Nav />}>
              <Route path='/read-post/:id' element={<ReadBlog />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
