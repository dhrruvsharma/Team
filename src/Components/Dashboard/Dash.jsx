import React, { useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useBoardContext } from "../../Context/BoardContext";
import "./Dash.css"
import Loader from "../Loader/Loader";
import { useLoadContext } from "../../Context/LoadContext";
import { useErrorContext } from "../../Context/ErrorContext";
import Error from "../ErrorPopup/Error";
import DashNav from "../DashNav/Dashnav";

const Dashboard = () => {
    const token = Cookies.get("token")
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const [board, setBoard] = useState([])
    const [load, setLoad] = useState(false)
    const { setBoards } = useBoardContext()
    const { toLoad } = useLoadContext()
    const { setToLoad } = useLoadContext()
    const { pop } = useErrorContext()

    const getBoards = async () => {
        setLoad(true)
        try {
            const response = await axios.get(`${url}api/user/boards/get`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setBoard(response.data.boards)
        } catch (error) {
            console.error(error)
        }
        setLoad(false)
        setToLoad(false)
    }

    useEffect(() => {
        if (toLoad === true) {
            getBoards()
        }
    }, [toLoad])

    useEffect(() => {
        getBoards()
    }, [])

    useEffect(() => {
        const extractedBoards = board.map((item) => {
            return (
                {
                    boardID: item.boardID,
                    boardName: item.boardName
                }
            )
        })
        setBoards(extractedBoards)
    }, [board])



    return (
        <div className="dashboard">
            <div className="dash-navbar">
                <DashNav />
            </div>
            {pop && (
                <Error />
            )}
            {!load ? (
                <div className="dashboard-container">
                    <div className="sidebar-container">
                        <SideBar />
                    </div>
                    <div className="dash-main">
                        This is the dashboard
                    </div>
                </div>
            ) : <Loader />}
        </div>
    )
}
export default Dashboard