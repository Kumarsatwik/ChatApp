import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedConversation } = useConversation();

  const { authUser } = useAuthContext();

  const { socket } = useSocketContext();

  const { loading, sendMessage } = useSendMessage();

  const handleTyping = (e) => {
    if (socket && e.target.value.trim() !== "") {
      console.log("typing");
      socket.emit("typing", {
        conversationId: selectedConversation._id,
        userId: authUser._id,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          type="text"
          className="border outline-none text-sm rounded-lg block w-full p-2.5 bg-[#d1d5db] font-semibold"
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handleTyping}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner "></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
