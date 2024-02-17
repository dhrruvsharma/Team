import React, { createContext, useContext, useState } from "react";

const AddListContext = createContext()

export const useAddList = () => useContext(AddListContext)

export const AddListProvider = ({children}) => {
    const [listName,setListName] = useState("")
    const [showListPop,setShowListPop] = useState(false)
    const [AddListApi,setAddList] = useState(false)
    return (
        <AddListContext.Provider value={{listName,setListName,AddListApi,setAddList,showListPop,setShowListPop}}>
            {children}
        </AddListContext.Provider>
    )
}