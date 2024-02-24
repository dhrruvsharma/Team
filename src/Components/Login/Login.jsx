import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import Figure from "../../assets/Login.jpg"
import "./Login.css"
import { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Load, setLoad] = useState(false)
    const [msg, setMsg] = useState(false)
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location?.state?.path

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            navigate('/dashboard')
        }
    }, [])

    const ChangeType = () => {
        setShow(!show)
    }
    const HandleChange = (e) => {
        const { name, value } = e.target
        if (name === "Email") {
            setEmail(value)
        }
        if (name === "Password") {
            setPassword(value)
        }
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        setLoad(true)
        const url = import.meta.env.VITE_REACT_APP_SIGNUP
        try {
            const response = await axios.post(`${url}api/user/login`, {
                "email": email,
                "password": password
            })
            if (response.data.status === false) {
                setMsg(true)
                setErr(response.data.message)
            }
            else {
                Cookies.set("token", response.data.account.token, {
                    expires: 7,
                    secure: true,
                    httpOnly: false
                })
                if (redirectPath) {
                    navigate(`/${redirectPath}`)
                }
                else {
                    navigate('dashboard')
                }
            }
        } catch (error) {
            console.error(error)
        }
        setLoad(false)
    }

    return (
        <div className="login">
            <Nav />
            <div className="login-main">
                <form className="login-form" onSubmit={HandleSubmit}>
                    <h1>WELCOME BACK!</h1>
                    <label htmlFor="Email">Enter your email</label><br />
                    <input type="email" name="Email" id="Email" autoComplete="off" onChange={HandleChange} required />
                    <br />
                    <label htmlFor="Password">Enter your password</label>
                    <br />
                    {show ? (
                        <div className="password">
                            <input type="text" name="Password" id="Password" required onChange={HandleChange} />
                            <i className="far fa-eye" onClick={ChangeType} />
                        </div>
                    ) :
                        <div className="password">
                            <input type="password" name="Password" id="Password" required onChange={HandleChange} />
                            <i className="fa-solid fa-eye-slash" onClick={ChangeType} />
                        </div>
                    }
                    <div className="buttons">
                        <button type="submit">LOGIN</button>
                    </div>
                    {msg && (
                        <h4>{err}</h4>
                    )}
                </form>
                {Load && (
                    <Loader />
                )}
                <figure className="login-fig">
                    <img src={Figure} alt="" />
                </figure>
            </div>
        </div>
    )
}
export default Login