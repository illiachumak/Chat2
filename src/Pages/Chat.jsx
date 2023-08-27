import Chat from "../Components/Chat";
import ChatsList from "../Components/ChatsList";
import { Container, Stack } from "react-bootstrap";

const ChatPage = () => {


    return ( 
        <Container className="p-4">
            <Stack direction="horizontal" gap={4} className="align-items-start">
       <ChatsList/>
       <Chat/>
       </Stack>
        
        </Container>
    );
}
 
export default ChatPage;