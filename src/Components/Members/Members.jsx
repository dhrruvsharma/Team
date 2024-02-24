import React, { useEffect } from "react";
import { useMemberContext } from "../../Context/MemberContext";
import { useActiveContext } from "../../Context/ActiveContext";
import { useErrorContext } from "../../Context/ErrorContext";
import "./Members.css"
import axios from "axios";
import Cookies from "js-cookie";
const Members = () => {
    const { Members, ExtractedMembers, setExtractedMembers, AddMemberApi, setAddMemberApi, NewMember, setNewMemberPop } = useMemberContext()
    const { Active } = useActiveContext()
    const token = Cookies.get("token")
    const url = import.meta.env.VITE_REACT_APP_SIGNUP
    const {setError,setPop} = useErrorContext()
    useEffect(() => {
        if (Members) {
            const extractedMember = Members.map((item) => {
                const paddedNumber = item.id.c.map((num, index) => {
                    if (index === 0) {
                        return num.toString().padStart(4, '0')
                    }
                    else {
                        return num.toString().padStart(14, '0')
                    }
                })
                return {
                    id: paddedNumber.join(''),
                    name: item.name,
                    email: item.email,
                    show: false
                }
            })
            setExtractedMembers(extractedMember)
        }
    }, [Members])

    const ToggleShow = (index) => {
        setExtractedMembers(prevMembers => {
            const UpdatedMembers = [...prevMembers];
            UpdatedMembers[index] = {
                ...UpdatedMembers[index], show: !UpdatedMembers[index].show
            }
            return UpdatedMembers
        })
    }

    const AddMember = async () => {
        setAddMemberApi(false)
        try {
            const response = await axios.post(`${url}api/user/board/member/add`,{
                "email":NewMember,
                "boardID":Active.toString()
            },
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
            )
            setError(response.data.message)
            setPop(true)
        } catch (error) {
            setError(error.response.data.message)
            setPop(true)
        }
    }

    useEffect(() => {
        if (AddMemberApi && NewMember) {
            AddMember()
        }
    },[AddMemberApi])

    return (
        <div className="members-main">
            {Active && (
                <div className="members-container">
                    <h3>Members <span onClick={()=>{setNewMemberPop(true)}}>+</span></h3>
                    <div className="members">
                        {ExtractedMembers.map((item, index) => (
                            <div className="member-container" key={item.id}>
                                <h4 onClick={() => { ToggleShow(index) }}>{item.name}</h4>
                                {item.show && (
                                    <div className="details-container">
                                        <h2>Name:- {item.name}</h2>
                                        <h2>Email:- {item.email}</h2>
                                        <div className="button">
                                            <button onClick={() => { ToggleShow(index) }}>Close</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Members