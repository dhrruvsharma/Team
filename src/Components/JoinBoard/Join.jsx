import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Join.css"
import Nav from "../Nav/Nav"

const Join = () => {
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const token = Cookies.get("token")
    const navigate = useNavigate()
    const HandleJoin = async () => {
        try {
            const response = await axios.post(`${url}board/join/confirm`, {
                "boardID": "",
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            if (response.data.status === true) {
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="join-main">
            <Nav />
            <div className="main-join">
                <h1>Are you sure you want to join the board ?</h1>
                <div className="buttons">
                    <button onClick={HandleJoin}>Yes</button>
                    <Link to={'/dashboard'}>
                        <button>No</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Join