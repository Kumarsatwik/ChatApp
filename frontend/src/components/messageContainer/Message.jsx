/* eslint-disable react/prop-types */
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const isSender = message.senderId === authUser._id;
  const chatClassName = isSender ? "chat-end" : "chat-start";
  const profilePic = isSender
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = isSender ? "bg-blue-400" : "";

  return (
    <div className={` chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {message.createdAt.split("T")[0]}
      </div>
    </div>
  );
};

export default Message;
