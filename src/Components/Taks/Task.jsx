import React, { useEffect, useState } from "react";
import { useTaskContext } from "../../Context/AddTask";
import axios from "axios";
import JSONbig from 'json-bigint'
import Cookies from "js-cookie";
import "./Tasks.css"
import { useListContext } from "../../Context/ListContext";

const Tasks = ({ task, listID }) => {
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const { TaskList, Deadline, Headline, Description, Priority, AddTaskApi, setAddTask } = useTaskContext()
    const { setLists } = useListContext()
    const [ExtractedTasks, setExtractedTasks] = useState([])

    const token = Cookies.get("token")
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
        if (task) {
            const extractedTask = task.map((item) => {
                const paddedTask = item.id.c.map((num, index) => {
                    if (index === 0) {
                        return num.toString().padStart(4, '0')
                    }
                    else {
                        return num.toString().padStart(14, '0')
                    }
                })
                const formattedDate = item.deadline.split('T')[0]
                const finishedDate = item.deadline.split('T')[0]
                return {
                    id: paddedTask.join(''),
                    headline: item.headline,
                    description: item.description,
                    priority: item.priority,
                    deadline: formattedDate,
                    completed: item.completed,
                    completedBy: item.completedBy,
                    show: false,
                    finished: finishedDate
                }
            })
            setExtractedTasks(extractedTask)
        }
    }, [task])

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

    const ToggleDetails = (index) => {
        setExtractedTasks(prevTasks => {
            const UpdatedTasks = [...prevTasks];
            UpdatedTasks[index] = {
                ...UpdatedTasks[index], show: !UpdatedTasks[index].show
            };
            return UpdatedTasks;
        });
    }

    const MarkCompleted = async (id) => {
        try {
            const response = await axiosInstance.post(`${url}api/user/board/list/task/mark`, {
                "taskID": id.toString(),
                "listID": listID.toString(),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.data.status === true) {
                setLists(response.data.board.lists)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="task-main">
            {task && (
                <div className="task-container">
                    {ExtractedTasks.map((item, index) => (
                        <div className="task" key={index}>
                            {item.headline}
                            <div className="buttons">
                                <button onClick={() => { ToggleDetails(index) }}>Details</button>
                            </div>
                            {item.show && (
                                <div className="details-container">
                                    <h2>Task Details</h2>
                                    <div className="desc">
                                        <h3><span>Description:-</span> {item.description}</h3>
                                        <h3><span>Status:-</span>{item.completed ? <>Finished</> : <>Not Completed</>}</h3>
                                        <h3>
                                            {item.completed ? <><span>Finished On :- &nbsp; </span>{item.finished}</> : <><span>Deadline:-</span> {item.deadline}</>}
                                        </h3>
                                        <h3><span>Priority:-</span> {item.priority}</h3>
                                        <div className="buttons">
                                            <button onClick={() => { ToggleDetails(index) }}>Close</button>
                                            {item.completed ? <></> : <button onClick={() => { MarkCompleted(item.id) }}>Mark Completed</button>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Tasks