import React from "react";
import "./BoardPop.css"
import { useAddBoard } from "../../Context/AddBoard";
import axios from "axios";
import Cookies from "js-cookie";
import JSONbig from "json-bigint"
import { useBoardContext } from "../../Context/BoardContext";
import { useLoadContext } from "../../Context/LoadContext";
import { useActiveContext } from "../../Context/ActiveContext";

const DeleteBoard = () => {
    const { DeleteID, setBoardDelete } = useAddBoard()
    const {setActive} = useActiveContext()
    const { setLoadSide } = useLoadContext()
    const token = Cookies.get("token")
    const { setBoard } = useBoardContext()

    const axiosInstance = axios.create({
        transformResponse: [
            function (data) {
                try {
                    return JSONbig.parse(data)
                } catch (error) {
                    console.error(error)
                }
            }
        ]
    })

    const DeleteBoard = async () => {
        const url = import.meta.env.VITE_REACT_APP_SIGNUP
        setLoadSide(false)
        setBoardDelete(false)
        setActive()
        try {
            const response = await axiosInstance.delete(`${url}api/user/board/delete`, {
                data: {
                    "boardID": DeleteID.toString()
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setBoard(response.data.boards)
        } catch (error) {
            console.error(error)
        }
        setLoadSide(true)
    }
    return (
        <div className="delete-board">
            <div className="delete-main">
                <h2>Are you sure you want to delete the board ?</h2>
                <div className="buttons">
                    <button onClick={DeleteBoard}>Yes</button>
                    <button onClick={() => setBoardDelete(false)}>No</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteBoard