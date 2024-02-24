import React from "react";
import { useMemberContext } from "../../Context/MemberContext";
import "./Members.css"

const AddMember = () => {
    const { setNewMember, setNewMemberPop, setAddMemberApi } = useMemberContext()
    const HandleChange = (e) => {
        const { name, value } = e.target
        if (name === "Email") {
            setNewMember(value)
        }
    }
    const HandleSubmit = (e) => {
        setNewMemberPop(false)
        e.preventDefault()
        setAddMemberApi(true)
    }
    return (
        <div className="add-member">
            <h2>Enter the email of the person you want to add</h2>
            <form className="member-add" onSubmit={HandleSubmit}>
                <input type="email" name="Email" id="Email" required autoComplete="off" onChange={HandleChange} />
                <div className="buttons">
                    <button type="submit">Invite</button>
                    <button onClick={() => { setNewMemberPop(false) }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default AddMember