import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("chat-user");

      if (token) {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
      // toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    logout,
  };
};

export default useLogout;
