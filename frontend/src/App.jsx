import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  function handleLogin(userData) {
    setUser(userData)
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <Login 
            onLogin={handleLogin}
          />
        } />
      </Routes>
    </Router>
  )
}

export default App
