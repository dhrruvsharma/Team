import React, { createContext, useContext, useState } from "react";

const MemberContext = createContext()

export const useMemberContext = () => useContext(MemberContext)

export const MemberProvider = ({ children }) => {
    const [Members, setMembers] = useState([])
    const [ExtractedMembers,setExtractedMembers] = useState([])
    const [NewMember,setNewMember] = useState("")
    const [NewMemberPop,setNewMemberPop] = useState(false)
    const [AddMemberApi,setAddMemberApi] = useState(false)
    return (
        <MemberContext.Provider value={{ Members, setMembers, ExtractedMembers, setExtractedMembers, NewMember, setNewMember, NewMemberPop, setNewMemberPop, AddMemberApi, setAddMemberApi }} >
            {children}
        </MemberContext.Provider>
    )
}