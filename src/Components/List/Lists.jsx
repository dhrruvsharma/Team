import React, { useEffect } from "react";
import { useActiveContext } from "../../Context/ActiveContext";
import axios from "axios";
import Cookies from "js-cookie";
import JSONbig from "json-bigint"
import { useLoadContext } from "../../Context/LoadContext";
import Loader from "../Loader/Loader";
import { useListContext } from "../../Context/ListContext";
import "./Lists.css"
import { useAddList } from "../../Context/AddList";
import { useTaskContext } from "../../Context/AddTask";
import Tasks from "../Taks/Task";

const Lists = () => {
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const { Active, ActiveList, setActiveList } = useActiveContext()
    const { setAddTaskPop, setTaskList } = useTaskContext()
    const token = Cookies.get('token')
    const { loadList, setLoadList } = useLoadContext()
    const { lists, setLists, setDeleteListPop, DeleteListApi, setDeleteListApi, ExtractedLists, setExtractedLists } = useListContext()
    const { listName, setShowListPop, AddListApi, setAddList } = useAddList()
    const { TaskList, Deadline, Headline, Description, Priority, AddTaskApi, setAddTask } = useTaskContext()
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
            setLists(response.data.board.lists)
        } catch (error) {
            console.error(error)
        }
        setLoadList(true)
    }

    const HandleDeleteList = (id) => {
        setActiveList(id)
        setDeleteListPop(true)
    }

    const AddList = async () => {
        setLoadList(false)
        try {
            const response = await axiosInstance.post(`${url}api/user/board/list/add`, {
                "boardID": Active.toString(),
                "listName": listName,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
            )
            setLists(response.data.board.lists)
        } catch (error) {
            console.error(error)
        }
        setLoadList(true)
        setAddList(false)
    }

    useEffect(() => {
        if (lists) {
            const extractedLists = lists.map((item) => {
                const paddedList = item.listID.c.map((num, index) => {
                    if (index === 0) {
                        return num.toString().padStart(4, '0')
                    } else {
                        return num.toString().padStart(14, '0')
                    }
                })
                return {
                    listID: paddedList.join(''),
                    listName: item.listName,
                    tasks: item.tasks,
                    load: true
                }
            })
            setExtractedLists(extractedLists)
        }
    }, [lists])

    useEffect(() => {
        if (AddListApi && listName) {
            AddList()
        }
    }, [AddListApi])

    const DeleteList = async () => {
        setLoadList(false)
        try {
            const response = await axiosInstance.delete(`${url}api/user/board/list/delete`, {
                data: {
                    "listID": ActiveList.toString()
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLists(response.data.board.lists)
        } catch (error) {
            console.error(error)
        }
        setLoadList(true)
        setDeleteListApi(false)
    }

    useEffect(() => {
        if (DeleteListApi && ActiveList) {
            DeleteList()
        }
    }, [DeleteListApi])

    const HandleAddTask = (id) => {
        setTaskList(id)
        setAddTaskPop(true)
    }

    const AddTask = async () => {
        try {
            const response = await axiosInstance.post(`${url}api/user/board/list/task/add`, {
                "listID": TaskList.toString(),
                "deadline": Deadline,
                "headline": Headline,
                "description": Description,
                "priority": Priority
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            if (response.data.status === true) {
                setLists(response.data.board.lists)
            }
        } catch (error) {
            console.error(error)
        }
        setAddTask(false)
    }

    useEffect(() => {
        if (AddTaskApi) {
            AddTask()
        }
    }, [AddTaskApi])


    return (
        <div className="lists">
            {loadList ? (
                <div className="lists-container">
                    {ExtractedLists.map((item) => (
                        <div className="list" key={item.listID}>
                            <div className="list-container" >
                                <h1>{item.listName}</h1>
                                <i className="fa fa-trash fa-2x" onClick={() => { HandleDeleteList(item.listID) }} />
                            </div>
                            <hr />
                            <div className="tasks-container">
                                <h2>Tasks <span onClick={() => { HandleAddTask(item.listID) }}>+</span></h2>
                                <Tasks task={item.tasks} listID={item.listID} />
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