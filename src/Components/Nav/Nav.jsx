import React from "react";
import Logo from "../../assets/S3 Thunder.jpg"
import "./Nav.css"
import { Link } from "react-router-dom";
const Nav = () => {
    return (
        <>
            <div className="nav-main">
                <figure className="logo">
                    <img src={Logo} alt="Logo" />
                    <h2>TeamSync</h2>
                </figure>
                <div className="links">
                    <div className="home">
                        <h3>Home</h3>
                    </div>
                    <div className="about">
                        <h3>About</h3>
                    </div>
                </div>
                <div className="login-signup-buttons">
                    <div className="buttons">
                        <Link to={'/login'}>
                            <button><h3>Login</h3></button>
                        </Link>
                        <Link to={'/signup'}>
                            <button>
                                <h3>SignUp</h3>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}
export default Nav