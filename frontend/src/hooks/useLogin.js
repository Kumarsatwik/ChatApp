import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const login = async (userName, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, {
        userName,
        password,
      });
      const data = res.data;
      console.log(data);

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;
