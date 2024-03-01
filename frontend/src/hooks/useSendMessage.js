import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/messages/send/${selectedConversation._id}`,
        {
          message, // Move message inside the data object
        },
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
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (err) {
      toast.error(err.message);
      if (err.response.status == 401) {
        toast.error(err.message);
        localStorage.removeItem("chat-user");
        window.location.href = "/";
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
