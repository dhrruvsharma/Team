import React, { createContext, useContext } from "react";
import { useState } from "react";

const LoadContext = createContext()

export const useLoadContext = () => useContext(LoadContext)

export const LoadProvider = ({ children }) => {
    const [toLoad, setToLoad] = useState(false)
    return (
        <LoadContext.Provider value={{ toLoad, setToLoad }} >
            {children}
        </LoadContext.Provider>
    )
}