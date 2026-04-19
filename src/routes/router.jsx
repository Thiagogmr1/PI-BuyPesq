import { Routes, Route } from 'react-router-dom'

import LandingPage from '../landing/LandingPage'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
// import SelectProfile from '../features/auth/pages/SelectProfile'
import BuyPesqHome from '../features/professionals/pages/BuyPesqHome'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/select-profile" element={<SelectProfile />} /> */}
            <Route path="/home" element={<BuyPesqHome />} />
        </Routes>
    )
}

export default AppRoutes