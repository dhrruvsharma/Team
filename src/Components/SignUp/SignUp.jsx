import React from "react";
import Figure from "../../assets/Login.jpg"
import Nav from "../Nav/Nav";
import "./SignUp.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState(false)
    const [Load, setLoad] = useState(false)
    const HandleChange = (e) => {
        const { name, value } = e.target
        if (name === "password") {
            setPassword(value)
        }
        if (name === "Name") {
            setName(value)
        }
        if (name === "Email") {
            setEmail(value)
        }
    }
    const [show, setShow] = useState(false)
    const ChangeType = () => {
        setShow(!show)
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        setLoad(true)
        const url = import.meta.env.VITE_REACT_APP_SIGNUP
        setErr(false)
        try {
            const response = await axios.post(`${url}api/user/new`, {
                "name": name,
                "password": password,
                "email": email,
            })
            setLoad(false)
            console.log(response.data.message)
            if (response.data.status === true) {
                navigate('/otp')
            }
            else {
                setErr(true)
                setMsg(response.data.message)
            }
        }
        catch (error) {
            setLoad(false)
            console.error(error)
        }
    }
    return (
        <div className="signup">
            <Nav />
            <div className="signup-main">
                <figure className="signup-image">
                    <img src={Figure} alt="Image" />
                </figure>
                {Load && (
                    <Loader />
                )}
                <form className="signup-form" onSubmit={HandleSubmit}>
                    <h2>SIGNUP</h2>
                    <label htmlFor="Name">Enter your name</label><br />
                    <input type="text" name="Name" id="Name" required onChange={HandleChange} autoComplete="off" /><br />
                    <label htmlFor="Email">Enter Your Email</label><br />
                    <input type="text" name="Email" id="Email" autoComplete="off" required onChange={HandleChange} /><br />
                    <label htmlFor="password">Enter Your Password</label><br />
                    {show ? (
                        <div className="password">
                            <input type="text" name="passwrd" id="password" onChange={HandleChange} />
                            <i className="fa fa-eye fa-2x" onClick={ChangeType} />
                        </div>
                    ) : (
                        <div className="password">
                            <input type="password" name="password" id="password" onChange={HandleChange} />
                            <i className="fa-solid fa-eye-slash fa-2x" onClick={ChangeType} />
                        </div>
                    )}
                    <div className="buttons">
                        <button type="submit">SignUp</button>
                    </div>
                    {err && (
                        <div className="error">
                            <h3>{msg}</h3>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
export default Signup