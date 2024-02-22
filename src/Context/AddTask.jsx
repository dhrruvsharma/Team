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
    const [ShowDescription,setShowDescription] = useState(false)
    return (
        <TaskContext.Provider value={{ TaskList, setTaskList, Headline, setHeadline, Description, setDescription, Deadline, setDeadline, Priority, setPriority, AddTaskApi, setAddTask, AddTask, setAddTaskPop, ShowDescription, setShowDescription }}>
            {children}
        </TaskContext.Provider>
    )
}