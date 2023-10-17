import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchRecipientUser = (chat) => {
   const [recipient, setRecipient] = useState(null);

   const user = JSON.parse(localStorage.getItem('user'))
   const recipientId = chat && chat.members && chat?.members.find(id => id !== user._id);
   useEffect(() => {
       const fetchRecipient = async () => {
           try {
               // Assuming the backend expects recipientId as a path parameter
               const response = await axios.get(`http://localhost:5000/api/users/find/${recipientId}`);
               setRecipient(response.data);
           } catch (error) {
               console.log(error);
           }
       };

       // Only fetch if recipientId is defined
       if (recipientId) {
           fetchRecipient();
       }
   }, [recipientId]); // The effect should re-run if recipientId changes

   return recipient;
}

export default useFetchRecipientUser;
