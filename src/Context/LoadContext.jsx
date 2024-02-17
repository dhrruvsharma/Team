import React, { createContext, useContext } from "react";
import { useState } from "react";

const LoadContext = createContext()

export const useLoadContext = () => useContext(LoadContext)

export const LoadProvider = ({ children }) => {
    const [toLoad, setToLoad] = useState(false)
    const [loadList,setLoadList] = useState(false)
    const [LoadSide,setLoadSide] = useState(false)
    return (
        <LoadContext.Provider value={{ toLoad, setToLoad,loadList,setLoadList,LoadSide,setLoadSide }} >
            {children}
        </LoadContext.Provider>
    )
}