import React from "react";
import SideBar from "../Sidebar/Sidebar";
import { useState } from "react";

const Dashboard = () => {
    const [boards,setBoards] = useState([])



    return (
        <div className="dashboard">
            <SideBar />
            This is the dashboard
        </div>
    )
}
export default Dashboard