import React, { createContext, useContext } from "react";
import { useState } from "react";

const ActiveContext = createContext()

export const useActiveContext = () => useContext(ActiveContext)

export const ActiveProvider = ({children}) => {
    const [Active,setActive] = useState()
    return (
        <ActiveContext.Provider value={{Active,setActive}}>
            {children}
        </ActiveContext.Provider>
    )
}