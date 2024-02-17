import React, { createContext, useContext, useState } from "react";

const ListContext = createContext()

export const useListContext = () => useContext(ListContext)

export const ListProvider = ({children}) => {
    const [lists,setLists] = useState([])
    return(
        <ListContext.Provider value={{lists,setLists}}>
            {children}
        </ListContext.Provider>
    )
}