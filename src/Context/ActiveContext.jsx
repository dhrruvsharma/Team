import React, { createContext, useContext } from "react";
import { useState } from "react";

const ActiveContext = createContext()

export const useActiveContext = () => useContext(ActiveContext)

export const ActiveProvider = ({children}) => {
    const [Active,setActive] = useState()
    const [ActiveList,setActiveList] = useState()
    return (
        <ActiveContext.Provider value={{Active,setActive,ActiveList,setActiveList}}>
            {children}
        </ActiveContext.Provider>
    )
}