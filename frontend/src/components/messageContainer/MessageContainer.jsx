import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { socket } = useSocketContext();
  // const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("userTyping", (userId) => {
        console.log("user Id", userId);
      });
    }
    return () => {
      if (socket) {
        socket.off("userTyping");
      }
    };
  }, [socket]);

  useEffect(() => {
    // cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="bg-[#d1d5db] px-4 py-2 mb-2">
              <span className="label-text">To: </span>
              <span className="text-gray-900 font-bold">
                {selectedConversation?.fullName}
              </span>
              {/* <div className="typing-indicators">
                {typingUsers.map((userId) => (
                  <div key={userId} className="typing-indicator">
                    {userId} is typing...
                  </div>
                ))}
              </div> */}
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </>
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center  sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-2">
        <p className="text-3xl ">Welcome to 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
