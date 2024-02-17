import React from "react";
import "./BoardPop.css"
import { useAddBoard } from "../../Context/AddBoard";

const BoardPopUp = () => {
    const {setShowBoard} = useAddBoard()
    const {setboardName} = useAddBoard()
    const {setAddApi} = useAddBoard()
    const HandleBoardPop = (e) => {
        e.preventDefault()
        setAddApi(true)
        setShowBoard(false)
    }

    const HandleChange = (e) => {
        const {name,value} = e.target
        if (name === "BoardName") {
            setboardName(value)
        }
    }

    return (
        <div className="popup-container">
            <div className="container">
                <h2>Create A New Board</h2>
                <form className="board-form" onSubmit={HandleBoardPop}>
                    <label htmlFor="BoardName">Enter the Board Name</label><br />
                    <input type="text" name="BoardName" id="BoardName" autoComplete="off" required onChange={HandleChange}/>
                    <div className="buttons">
                        <button type="submit">Add Board</button>
                        <button onClick={()=>setShowBoard(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default BoardPopUp