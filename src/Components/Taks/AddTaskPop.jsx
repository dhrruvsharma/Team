import React from "react";
import "./Tasks.css"
import { useTaskContext } from "../../Context/AddTask";

const AddTaskPop = () => {
    const { setAddTaskPop, setAddTask, setHeadline, setDescription, setDeadline, setPriority } = useTaskContext()
    const HandleChange = (e) => {
        const { name, value } = e.target
        if (name === "Headline") {
            setHeadline(value)
        }
        if (name === "Description") {
            setDescription(value)
        }
        if (name === "Deadline") {
            setDeadline(value)
        }
        if (name === "Priority") {
            setPriority(value)
        }
    }
    const HandleSubmit = (e) => {
        e.preventDefault()
        setAddTask(true)
        setAddTaskPop(false)
    }
    return (
        <div className="addTask">
            <div className="add-main">
                <h2>Add A New Task</h2>
                <form className="task-add" onSubmit={HandleSubmit}>
                    <label htmlFor="Headline">Enter Headline</label>
                    <input type="text" name="Headline" id="Headline" autoComplete="off" required onChange={HandleChange} />
                    <label htmlFor="Description">Enter Description</label>
                    <input type="text" name="Description" id="Description" autoComplete="off" required onChange={HandleChange} />
                    <label htmlFor="Deadline">Enter Deadline in Days</label>
                    <input type="number" name="Deadline" id="Deadline" autoComplete="off" required onChange={HandleChange} />
                    <label htmlFor="Priority">Enter Priority</label>
                    <input type="number" name="Priority" id="Priority" autoComplete="off" required onChange={HandleChange} />
                    <div className="buttons">
                        <button type="submit">Add Task</button>
                        <button onClick={() => { setAddTaskPop(false) }}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddTaskPop