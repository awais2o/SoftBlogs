import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginSignup from './Pages/LoginSignup'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginSignup login />} />
          <Route path='/signup' element={<LoginSignup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
