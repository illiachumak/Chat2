import Chat from "../Components/Chat";
import ChatsList from "../Components/ChatsList";
import { Container, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import socket from "../ws";
import { useEffect } from "react";
import { setMessage } from '../redux/slices/chatSlice'

const ChatPage = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.chat.notifications)

    useEffect(() => {
        console.log(notifications)
    },[notifications])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            socket.emit('setOnline', user._id)
            socket.on('message', (data) => {
                dispatch(setMessage(data))
            });

            return () => socket.off('message');
        }
    }, []);

    return ( 
        <Container className="p-4">
            <Stack direction="horizontal" gap={4} className="align-items-start">
       <ChatsList/>
       <Chat socket={socket}/>
       </Stack>
        
        </Container>
    );
}
 
export default ChatPage;