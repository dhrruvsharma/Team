import React, { useEffect } from "react";
import SideBar from "../Sidebar/Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { useBoardContext } from "../../Context/BoardContext";
import "./Dash.css"
import { useLoadContext } from "../../Context/LoadContext";
import { useErrorContext } from "../../Context/ErrorContext";
import Error from "../ErrorPopup/Error";
import DashNav from "../DashNav/Dashnav";
import Lists from "../List/Lists";
import { useActiveContext } from "../../Context/ActiveContext";
import JSONbig from "json-bigint"
import BoardPopUp from "../BoardPopUp/BoardPop";
import { useAddBoard } from "../../Context/AddBoard";
import ListPop from "../List/ListPop";
import { useAddList } from "../../Context/AddList";
import DeleteBoard from "../BoardPopUp/Delete";
import DeleteList from "../List/DeleteList";
import { useListContext } from "../../Context/ListContext";

const Dashboard = () => {
    const token = Cookies.get("token")
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const { showBoardPop } = useAddBoard()
    const { setBoards, board, setBoard } = useBoardContext()
    const { toLoad } = useLoadContext()
    const { setToLoad } = useLoadContext()
    const { pop } = useErrorContext()
    const { Active } = useActiveContext()
    const { setAddApi, showBoardDelete } = useAddBoard()
    const { setLoadSide } = useLoadContext()
    const { showListPop } = useAddList()
    const { DeleteListPop } = useListContext()

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

    const getBoards = async () => {
        setLoadSide(false)
        try {
            const response = await axiosInstance.get(`${url}api/user/boards/get`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setBoard(response.data.boards)
        } catch (error) {
            console.error(error)
        }
        setLoadSide(true)
        setToLoad(false)
        setAddApi(false)
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
        if (board) {
            const extracted = board.map((item) => (
                (
                    {
                        boardID: BigInt(item.boardID.c.join("")),
                        boardName: item.boardName
                    }
                )
            ))
            setBoards(extracted)
        }
        else {
            setBoards([])
        }
    }, [board])

    return (
        <div className="dashboard">
            <div className="dash-navbar">
                <DashNav />
            </div>
            {pop && (
                <Error />
            )}
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <SideBar />
                </div>
                <div className="dash-main">
                    {DeleteListPop && (
                        <div className="delete-list">
                            <DeleteList />
                        </div>
                    )}
                    {showBoardDelete && (
                        <div className="delete-board">
                            <DeleteBoard />
                        </div>
                    )}
                    {showBoardPop && (
                        <div className="board-pop">
                            <BoardPopUp />
                        </div>
                    )}
                    {Active && (
                        <div className="dash-lists">
                            <Lists />
                            <div className="list-pop">
                                {showListPop && (
                                    <ListPop />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Dashboard