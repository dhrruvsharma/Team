import React, { useEffect } from "react";
import { useBoardContext } from "../../Context/BoardContext";
import "./Sidebar.css"
import Cookies from "js-cookie";
import axios from "axios";
import { useLoadContext } from "../../Context/LoadContext";
import Loader from "../Loader/Loader";
import { useErrorContext } from "../../Context/ErrorContext";
import { useActiveContext } from "../../Context/ActiveContext";
import { useAddBoard } from "../../Context/AddBoard";

const SideBar = () => {
    const { boards } = useBoardContext()
    const { setPop, setError } = useErrorContext()
    const { setToLoad } = useLoadContext()
    const { setActive } = useActiveContext()
    const { boardName } = useAddBoard()
    const { AddApi, setAddApi } = useAddBoard()
    const { setShowBoard } = useAddBoard()
    const { LoadSide, setLoadSide } = useLoadContext()

    const token = Cookies.get("token")
    const AddBoard = async () => {
        setLoadSide(false)
        const url = import.meta.env.VITE_REACT_APP_SIGNUP
        try {
            const response = await axios.post(`${url}api/user/board/create`, {
                "boardName": boardName,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
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
        setLoadSide(true)
        setAddApi(false)
    }

    useEffect(() => {
        if (AddApi && boardName) {
            AddBoard()
        }
    }, [AddApi])

    const HandleClick = () => {
        setShowBoard(true)
    }

    return (
        <div className="sidebar">
            {LoadSide ? (
                <div className="boards-container">
                    <h3>Your Boards <span className="add" onClick={HandleClick}>+</span></h3>
                    {boards.map((item) => (
                        <div className="board-container" key={item.boardID} onClick={() => setActive(item.boardID)}>
                            <div className="board-main">
                                <p>{item.boardName}</p>
                                <i className="fa fa-trash" onClick={() => {console.log(item.boardID) }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : <Loader />}
        </div>
    )
}
export default SideBar