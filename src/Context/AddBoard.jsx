import React, { createContext, useContext, useState } from "react";

const AddBoardContext = createContext()

export const useAddBoard = () => useContext(AddBoardContext)

export const AddBoardProvider = ({children}) => {
    const [boardName,setboardName] = useState("")
    const [showBoardPop,setShowBoard] = useState(false)
    const [AddApi,setAddApi] = useState(false)
    const [DeleteID,setDelete] = useState("")
    const [showBoardDelete,setBoardDelete] = useState(false)
    return (
        <AddBoardContext.Provider value={{boardName,setboardName,showBoardPop,setShowBoard,AddApi,setAddApi,DeleteID,setDelete,showBoardDelete,setBoardDelete}}>
            {children}
        </AddBoardContext.Provider>
    )
}