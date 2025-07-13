import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react'; // 1. Importe o useEffect

import Login from './components/Login';
import Principal from './components/Principal';
import Deposito from './components/Deposito';
import Saque from './components/Saque';
import Cadastro from './components/Cadastro';


import './App.css';

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      try {
        // Tenta converter o JSON. Se for inválido, retorna null.
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        console.error("Erro ao analisar dados do usuário do localStorage", error);
        return null;
      }
    });
    
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  function handleLoginSuccess(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }

  function handleNavigateToRegister() {
    console.log('Navegar para registro');
  }

  function handleUpdateBalance(newBalance) {
    setUser(prevUser => ({
      ...prevUser,
      saldo: newBalance,
    }));
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
          path="/deposito"
          element={
            <ProtectedRoute user={user}>
              <Deposito user={user} onLogout={handleLogout} onUpdateBalance={handleUpdateBalance} />           
            </ProtectedRoute>
          }
        />

        <Route
          path="/saque"
          element={
            <ProtectedRoute user={user}>
              <Saque user={user} onLogout={handleLogout} onUpdateBalance={handleUpdateBalance} />           
            </ProtectedRoute>
          }
        />

        <Route
          path="/cadastro"
          element={
            <Cadastro onLogout={handleLogout} />
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
