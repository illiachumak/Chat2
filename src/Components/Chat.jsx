import {Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadingChats } from '../redux/slices/chatSlice'
import UserChatShort from '../Components/UserChatShort'
import UserPotentialChatShort from '../Components/UserPotentialChatShort'
import useFetchRecipientUser from "../hooks/fetchRecipientUser";

const Chat = () => {

    const dispatch = useDispatch()
    const { currentChat } = useSelector(state => state.chat)
    const user = JSON.parse(localStorage.getItem('user'))
    const recipientUser = useFetchRecipientUser(currentChat, user)
    useEffect(() => {

      }, [currentChat])

    return ( 
        <>
           {recipientUser?.name}

        </>
    
    
    )
}
 
export default Chat;