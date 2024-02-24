import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Join.css"
import Nav from "../Nav/Nav"

const Join = () => {
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const navigate = useNavigate()
    const token = Cookies.get("token")
    useEffect(() => {
        if (!token) {
            navigate('/login', { state: { id: 1, path: window.location.pathname } })
        }
    }, [])
    const {boardID,invitationToken} = useParams()
    const HandleJoin = async () => {
        try {
            const response = await axios.post(`${url}board/join/confirm`, {
                "boardID": boardID.toString(),
                "invitationToken":invitationToken
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