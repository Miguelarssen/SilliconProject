import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Principal from './components/Principal';
import './App.css';

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);

  function handleLoginSuccess(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  function handleNavigateToRegister() {
    console.log('Navegar para registro');
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/principal" />
            ) : (
              <Login 
                onLoginSuccess={handleLoginSuccess}
                onNavigateToRegister={handleNavigateToRegister}
              />
            )
          }
        />
        
        <Route
          path="/principal"
          element={
            <ProtectedRoute user={user}>
              <Principal user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/"
          element={<Navigate to="/principal" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
