import { Routes, Route } from 'react-router-dom'

import LandingPage from '../landing/LandingPage'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes