import React from "react";
import { useErrorContext } from "../../Context/ErrorContext";
import "./Error.css"

const Error = () => {
    const {pop,setPop,Error} = useErrorContext()
    const ClosePopup = () => {
        setPop(false)
    }
    return (
        <div className="message-container">
            {pop && (
                <div className="message">
                    <div className="text-container">
                        <h2>{Error}</h2>
                    </div>
                    <div className="close-button">
                        <button onClick={ClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Error