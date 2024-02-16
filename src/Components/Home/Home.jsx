import React from "react";
import Nav from "../Nav/Nav";
import Hero from "../../assets/01_Hero_2x.webp"
import "./Home.css"
const Home = () => {
    return (
        <div className="Home">
            <Nav />
            <div className="hero-container">
                <div className="hero-text">
                    <h1>
                        TeamSync makes it easier for teams to manage projects and tasks
                    </h1>
                    <p>
                        Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's doing what and what needs to get done.
                    </p>
                </div>
                <figure className="hero-img">
                    <img src={Hero} alt="Image" />
                </figure>
            </div>
        </div>
    )
}
export default Home