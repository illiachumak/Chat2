import { Stack } from "react-bootstrap";
import { createChat } from "../redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const UserChatShort = ({user}) => {

    const dispatch = useDispatch();
    const userMe = JSON.parse(localStorage.getItem('user'));
    const [users, setUsers] = useState([]);

    useEffect(() => {
            setUsers([userMe?._id, user?._id]);
    }, []);

    const handleClickPotentialChat = () => dispatch(createChat(users));

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
            onClick={handleClickPotentialChat}
        >
            <div className="d-flex">
                <div className="me-2">A</div>
                <div className="text-content">

                            <div className="name">{user?.name}</div>
                            <div className="text">Start conversation</div>
                 
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <span className="user-online"></span>
            </div>
        </Stack>
    );
}

export default UserChatShort;
