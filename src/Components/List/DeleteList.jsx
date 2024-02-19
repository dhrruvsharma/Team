import React from "react";
import "./Lists.css"
import { useListContext } from "../../Context/ListContext";

const DeleteList = () => {
    const {setDeleteListApi,setDeleteListPop} = useListContext()
    const HandleClick = () => {
        setDeleteListApi(true)
        setDeleteListPop(false)
    }
    return (
        <div className="delete-list">
            <div className="main-delete">
                <h2>Are you sure you want to delete the List ?</h2>
                <div className="buttons">
                    <button onClick={HandleClick}>Yes</button>
                    <button>No</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteList