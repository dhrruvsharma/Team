import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashNav.css"

const DashNav = () => {
    const navigate = useNavigate()
    const Logout = () => {
        Cookies.remove("token")
        navigate('/')
    }
    return(
        <div className="dash-nav">
            <div className="logout">
                <button onClick={Logout}>LogOut</button>
            </div>
        </div>
    )
}
export default DashNav