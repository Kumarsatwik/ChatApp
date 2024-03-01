import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${serverUrl}/api/messages/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("chat-user")).token
              }`,
            },
          }
        );
        const data = res.data;
        if (data.error) {
          toast.error(data.error);
        } else {
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages, serverUrl]);
  return { loading, messages };
};

export default useGetMessages;
