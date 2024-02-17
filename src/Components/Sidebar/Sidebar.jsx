import React from "react";
import { useBoardContext } from "../../Context/BoardContext";
import "./Sidebar.css"
import Cookies from "js-cookie";
import axios from "axios";
import { useLoadContext } from "../../Context/LoadContext";
import Loader from "../Loader/Loader";
import { useState } from "react";
import { useErrorContext } from "../../Context/ErrorContext";

const SideBar = () => {
    const { boards } = useBoardContext()
    const {setPop,setError} = useErrorContext()
    const { setToLoad } = useLoadContext()

    const [load, setLoad] = useState(false)

    const token = Cookies.get("token")
    console.log(boards)
    const AddBoard = async () => {
        setLoad(true)
        const url = import.meta.env.VITE_REACT_APP_SIGNUP
        try {
            const response = await axios.post(`${url}api/user/board/create`, {
                "boardName": "Again",
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            if (response.data.status === true) {
                setToLoad(true)
            }
            else {
                setPop(true)
                setError(response.data.message)
            }
        } catch (error) {
            console.error(error)
            setPop(true)
            setError("Error adding the board")
        }
        setLoad(false)
    }


    return (
        <div className="sidebar">
            {!load ? (
                <div className="boards-container">
                    <h3>Your Boards <span className="add" onClick={AddBoard}>+</span></h3>
                    {boards.map((item) => (
                        <div className="board-container" key={item.boardID}>
                            <p>{item.boardName}</p>
                        </div>
                    ))}
                </div>
            ) : <Loader />}
        </div>
    )
}
export default SideBar