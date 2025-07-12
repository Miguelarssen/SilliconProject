import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Withdraw from './components/Withdraw'
import Deposit from './components/Deposit'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login') // login, register, dashboard, withdraw, deposit
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView('dashboard')
  }

  const handleRegister = (userData) => {
    setUser(userData)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('login')
  }

  const handleUpdateBalance = (newBalance) => {
    setUser(prev => ({
      ...prev,
      balance: newBalance
    }))
  }

  const navigateToLogin = () => setCurrentView('login')
  const navigateToRegister = () => setCurrentView('register')
  const navigateToDashboard = () => setCurrentView('dashboard')
  const navigateToWithdraw = () => setCurrentView('withdraw')
  const navigateToDeposit = () => setCurrentView('deposit')

  // Renderização condicional baseada na view atual
  switch (currentView) {
    case 'login':
      return (
        <Login 
          onLogin={handleLogin}
          onNavigateToRegister={navigateToRegister}
        />
      )
    
    case 'register':
      return (
        <Register 
          onRegister={handleRegister}
          onNavigateToLogin={navigateToLogin}
        />
      )
    
    case 'dashboard':
      return (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
          onNavigateToWithdraw={navigateToWithdraw}
          onNavigateToDeposit={navigateToDeposit}
        />
      )
    
    case 'withdraw':
      return (
        <Withdraw 
          user={user}
          onBack={navigateToDashboard}
          onUpdateBalance={handleUpdateBalance}
        />
      )
    
    case 'deposit':
      return (
        <Deposit 
          user={user}
          onBack={navigateToDashboard}
          onUpdateBalance={handleUpdateBalance}
        />
      )
    
    default:
      return (
        <Login 
          onLogin={handleLogin}
          onNavigateToRegister={navigateToRegister}
        />
      )
  }
}

export default App
