import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext()

export const useErrorContext = () =>  useContext(ErrorContext)

export const ErrorProvider = ({children}) => {
    const [Error,setError] = useState("")
    const [pop,setPop] = useState(false)
    return (
        <ErrorContext.Provider value={{Error,setError,pop,setPop}}>
            {children}
        </ErrorContext.Provider>
    )
}