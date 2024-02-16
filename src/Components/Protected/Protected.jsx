import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
    let auth = false
    const token = Cookies.get('token')
    if (token) {
        auth = true
    }
    return (
        auth ? <Outlet /> : <Navigate to={'login'} />
    )
}
export default Protected