import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Dashboard } from "../pages/Dashboard"
import { Profile } from "../pages/Profile"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { InterviewRoom } from "../pages/InterviewRoom"

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sign-up" element={<Register/>}/>
            <Route path="/assessment-interview" element={<InterviewRoom/>}/>
        </Routes>
    )
}
