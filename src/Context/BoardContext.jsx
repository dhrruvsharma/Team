import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const BoardsContext = createContext()

export const useBoardContext = () => useContext(BoardsContext)

export const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState([])
    return (
        <BoardsContext.Provider value={{ boards, setBoards }}>
            { children }
        </BoardsContext.Provider>
    )
}
