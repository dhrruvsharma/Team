import React from "react";
import { useBoardContext } from "../../Context/BoardContext";

const SideBar = () => {
    const {boards} = useBoardContext()
    console.log(boards)
    return(
        <div className="sidebar">
            <div className="boards-container">
                {boards.map((item) => (
                    <div className="board-container" key={item.boardID}>
                        <p>{item.boardName}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SideBar