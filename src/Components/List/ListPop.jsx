import React from "react";
import "./Lists.css"
import { useAddList } from "../../Context/AddList";

const ListPop = () => {
    const {setListName,setShowListPop,setAddList} = useAddList()
    const HandleSubmit = (e) => {
        e.preventDefault()
        setShowListPop(false)
        setAddList(true)
    }
    const HandleChange = (e) => {
        const {value,name} = e.target
        if (name === "listName") {
            setListName(value)
        }
    }
    return (
        <div className="listpop">
            <form className="list-add" onSubmit={HandleSubmit}>
                <h2>Add List</h2><br />
                <label htmlFor="listName">Enter the name of the list</label>
                <input type="text" name="listName" id="listName" required onChange={HandleChange} autoComplete="off"/>
                <div className="buttons">
                    <button type="submit">Create</button>
                    <button onClick={()=>setShowListPop(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default ListPop