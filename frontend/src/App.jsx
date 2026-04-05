import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/public/Home'
import Register from './pages/public/Register'
import Success from './pages/public/Success'
import CheckRegistration from './pages/public/CheckRegistration'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Events from './pages/admin/Events'
import AddEvent from './pages/admin/AddEvent'
import EditEvent from './pages/admin/EditEvent'
import Registrations from './pages/admin/Registrations'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/check-registration" element={<CheckRegistration />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/admin/events/add" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
          <Route path="/admin/events/edit/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
          <Route path="/admin/registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App