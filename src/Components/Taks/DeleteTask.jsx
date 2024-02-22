import React from "react";
import { useTaskContext } from "../../Context/AddTask";
import JSONbig from "json-bigint"
import Cookies from "js-cookie";
import { useListContext } from "../../Context/ListContext";
import axios from "axios";
import "./Tasks.css"

const DeleteTask = () => {
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const { DeleteTaskID, DeleteTaskList, setDeleteTaskPop, setLoad } = useTaskContext()
    const token = Cookies.get("token")
    const { setLists } = useListContext()

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

    const DeleteTask = async () => {
        setLoad(false)
        setDeleteTaskPop(false)
        try {
            const response = await axiosInstance.delete(`${url}api/user/board/list/task/delete`, {
                data: {
                    "taskID": DeleteTaskID.toString(),
                    "listID": DeleteTaskList.toString(),
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLists(response.data.board.lists)
        } catch (error) {
            console.error(error)
        }
        setLoad(true)
    }

    return (
        <div className="delete-task">
            <h2>Do you really want to delete this task?</h2>
            <div className="buttons">
                <button onClick={DeleteTask}>Yes</button>
                <button onClick={() => { setDeleteTaskPop(false) }}>No</button>
            </div>
        </div>
    )
}
export default DeleteTask