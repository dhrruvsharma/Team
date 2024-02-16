import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Figure from "../../assets/otp.avif"
import "./Otp.css"
import axios from "axios";
import Loader from "../Loader/Loader";

const Otp = () => {
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")
    const [Load,setLoad] = useState(false)
    const HandleChange = (e) => {
        const { name, value } = e.target
        if (name === "email") {
            setEmail(value)
        }
        if (name === "otp") {
            setOtp(value)
        }
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        setLoad(true)
        const url = import.meta.env.VITE_REACT_APP_SIGNUP
        try {
            const response = await axios.post(`${url}api/user/new/verify`, {
                "email": email,
                "otp": otp
            })
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
        setLoad(false)
    }

    return (
        <div className="otp">
            <Nav />
            <div className="otp-main">
                <form className="otp-form" onSubmit={HandleSubmit}>
                    <label htmlFor="email">Enter the email</label><br />
                    <input type="email" name="email" id="email" onChange={HandleChange} required autoComplete="off" /><br />
                    <label htmlFor="otp">Enter the otp</label><br />
                    <input type="text" name="otp" id="otp" onChange={HandleChange} required autoComplete="off" /><br />
                    <div className="buttons">
                        <button type="submit">Confirm</button>
                    </div>
                </form>
                {Load && (
                    <Loader />
                )}
                <figure className="otp-image">
                    <img src={Figure} alt="Image" />
                </figure>
            </div>
        </div>
    )
}
export default Otp