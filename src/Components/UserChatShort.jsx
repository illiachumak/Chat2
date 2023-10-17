import { Stack } from "react-bootstrap";
import useFetchRecipientUser from "../hooks/fetchRecipientUser";
import { createChat, getChat } from "../redux/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userIcon from "../../public/user-icon.svg"

const UserChatShort = ({ user, chat }) => {
    const dispatch = useDispatch();
    const userMe = JSON.parse(localStorage.getItem('user'));
    const recipientUser = useFetchRecipientUser(chat, user);
    
    
    const users = [userMe?._id, recipientUser?._id]

    const handleClickChat = () => dispatch(getChat(users));

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
            onClick={handleClickChat}
        >
            <div className="d-flex">
                <img src={userIcon} alt="A" className="me-2"/>
                <div className="text-content">
                            <div className="name">{recipientUser?.name}</div>
                            <div className="text">message</div>   
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">date</div>
                <div className="this-user-notifications">2</div>
                {recipientUser?.online &&<span className="user-online"></span>}
            </div>
        </Stack>
    );
}

export default UserChatShort;
