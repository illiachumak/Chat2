import {Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadingChats } from '../redux/slices/chatSlice'
import UserChatShort from '../Components/UserChatShort'
import UserPotentialChatShort from '../Components/UserPotentialChatShort'

const ChatsList = () => {

    const dispatch = useDispatch()
    const { potentialChats, userChats, isLoading, } = useSelector(state => state.chat)
    const [userMe, setUserMe] = useState(null)
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'))
        setUserMe(user)
        const userId = user._id
        if(user){
        dispatch(loadingChats(userId))
        }
    
      }, [])

    return ( 
        <>
            {userChats?.length < 1 ? null : (
                <Stack gap={3} className="messages-box flex-grow-0 pe-3">
                {isLoading && <p>Loading...</p>}
                {Array.isArray(userChats) && userChats.length > 0 && userChats.map((chat, index) => {
                    return(
                        <div key={index}>
                            <UserChatShort chat={chat} user={userMe}/>
                        </div>
                    );
                })}
                {Array.isArray(potentialChats) && potentialChats.length > 0 && potentialChats.map((user, index) => {
                    return(
                        <div key={index}>
                            <UserPotentialChatShort user={user}/>
                        </div>
                    );
                })}
                </Stack>
                )}
        </>
    
    
    )
}
 
export default ChatsList;