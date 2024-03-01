import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${serverUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("chat-user")).token
            }`,
          },
        });
        if (res.error) {
          throw new Error(res.error);
        }

        setConversations(res.data);
      } catch (err) {
        console.log(err);
        if (err.response.status == 401) {
          toast.error(err.message);
          // localStorage.removeItem("chat-user");
          // window.location.href = "/";
        }
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
