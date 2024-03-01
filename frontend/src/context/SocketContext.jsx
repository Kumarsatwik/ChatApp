import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([]);
  const { authUser } = useAuthContext();

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (authUser) {
      const socket = io(serverUrl, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      //   socket.on() is used to listend to the events . can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
