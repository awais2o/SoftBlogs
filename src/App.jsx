import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import './App.css'
import LoginSignup from './Pages/LoginSignup'
import Dashboard from './Pages/Admin/Dashboard'
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token || role !== 'admin') {
    return <Navigate to='/login' />
  }
  return children
}
function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<LoginSignup login />} />
          <Route path='/signup' element={<LoginSignup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
