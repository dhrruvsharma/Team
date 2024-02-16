import React, { useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useBoardContext } from "../../Context/BoardContext";

const Dashboard = () => {
    const token = Cookies.get("token")
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const [board, setBoard] = useState([])

    const { setBoards } = useBoardContext()

    useEffect(() => {
        const getBoards = async () => {
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
        }
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
            <SideBar />
            This is the dashboard
        </div>
    )
}
export default Dashboard