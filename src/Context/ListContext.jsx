import React, { createContext, useContext, useState } from "react";

const ListContext = createContext()

export const useListContext = () => useContext(ListContext)

export const ListProvider = ({ children }) => {
    const [lists, setLists] = useState([])
    const [DeleteListPop, setDeleteListPop] = useState(false)
    const [DeleteListApi, setDeleteListApi] = useState(false)
    const [ExtractedLists, setExtractedLists] = useState([])
    return (
        <ListContext.Provider value={{ lists, setLists, DeleteListApi, setDeleteListApi, DeleteListPop, setDeleteListPop,ExtractedLists,setExtractedLists }}>
            {children}
        </ListContext.Provider>
    )
}