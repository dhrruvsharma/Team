import React, { useEffect } from "react";
import { useActiveContext } from "../../Context/ActiveContext";
import axios from "axios";
import Cookies from "js-cookie";
import JSONbig from "json-bigint"
import { useState } from "react";
import { useLoadContext } from "../../Context/LoadContext";
import Loader from "../Loader/Loader";
import { useListContext } from "../../Context/ListContext";
import "./Lists.css"
import { useAddList } from "../../Context/AddList";

const Lists = () => {
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const { Active } = useActiveContext()
    const token = Cookies.get('token')
    const { loadList, setLoadList } = useLoadContext()
    const [board, setBoard] = useState([])
    const { lists, setLists } = useListContext()
    const { listName, setShowListPop, AddListApi, setAddList } = useAddList()
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

    useEffect(() => {
        if (Active) {
            GetLists()
        }
    }, [Active])
    const GetLists = async () => {
        setLoadList(false)
        try {
            const response = await axiosInstance.get(`${url}api/user/board/get`, {
                params: {
                    "boardID": Active
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setBoard(response.data.board)
        } catch (error) {
            console.error(error)
        }
        setLoadList(true)
    }

    const AddList = async () => {
        setLoadList(false)
        try {
            await axiosInstance.post(`${url}api/user/board/list/add`, {
                "boardID": Active.toString(),
                "listName": listName,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
            )
        } catch (error) {
            console.error(error)
        }
        setLoadList(true)
        setAddList(false)
        GetLists()
    }

    useEffect(() => {
        if (board.lists) {
            const extractedLists = board.lists.map((item) => (
                {
                    listID: BigInt(item.listID.c.join("")),
                    listName: item.listName,
                }
            ))
            setLists(extractedLists)
        }
    }, [board])

    useEffect(() => {
        if (AddListApi && listName) {
            AddList()
        }
    }, [AddListApi])

    return (
        <div className="lists">
            {loadList ? (
                <div className="lists-container">
                    {lists.map((item) => (
                        <div className="list" key={item.listID}>
                            <div className="list-container">
                                <h1>{item.listName}</h1>
                                <i className="fa fa-trash fa-2x" />
                            </div>
                            <hr />
                            <div className="tasks-container">
                                <h2>Tasks</h2>
                            </div>
                        </div>
                    ))}
                    <div className="addList">
                        <button onClick={() => setShowListPop(true)}>Add Another List</button>
                    </div>
                </div>
            ) :
                <div className="loading"><Loader /></div>
            }
        </div>
    )
}
export default Lists