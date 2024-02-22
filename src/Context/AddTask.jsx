import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext()

export const useTaskContext = () => useContext(TaskContext)

export const TaskProvider = ({ children }) => {
    const [TaskList, setTaskList] = useState("")
    const [Headline, setHeadline] = useState("")
    const [Description, setDescription] = useState("")
    const [Deadline, setDeadline] = useState("")
    const [Priority, setPriority] = useState("")
    const [AddTaskApi, setAddTask] = useState(false)
    const [AddTask, setAddTaskPop] = useState(false)
    const [DeleteTaskID,setDeleteTaskID] = useState("")
    const [DeleteTaskList,setDeleteList] = useState("")
    const [DeleteTaskPop,setDeleteTaskPop] = useState(false)
    const [Load,setLoad] = useState(true)
    return (
        <TaskContext.Provider value={{ TaskList, setTaskList, Headline, setHeadline, Description, setDescription, Deadline, setDeadline, Priority, setPriority, AddTaskApi, setAddTask, AddTask, setAddTaskPop, DeleteTaskList,setDeleteList, DeleteTaskID,setDeleteTaskID, DeleteTaskPop,setDeleteTaskPop,Load,setLoad}}>
            {children}
        </TaskContext.Provider>
    )
}