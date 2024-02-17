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

const Lists = () => {
    const { Active } = useActiveContext()
    const token = Cookies.get('token')
    const { loadList, setLoadList } = useLoadContext()
    const [board, setBoard] = useState([])
    const { lists, setLists } = useListContext()
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
        console.log(Active)
        if (Active) {
            GetLists()
        }
    }, [Active])
    const GetLists = async () => {
        const url = import.meta.env.VITE_REACT_APP_SIGNUP
        setLoadList(true)
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
        setLoadList(false)
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

    return (
        <div className="lists">
            {!loadList ? (
                <div className="lists-container">
                    {lists.map((item) => (
                        <div className="list" key={item.listID}>
                            <div className="list-container">
                                <h1>{item.listName}</h1>
                            </div>
                            <hr />
                        </div>
                    ))}
                    <div className="addList">
                        <button>Add Another List</button>
                    </div>
                </div>
            ) : <Loader />}
        </div>
    )
}
export default Lists