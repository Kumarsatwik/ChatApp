/* eslint-disable react/prop-types */
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

// eslint-disable-next-line react/prop-types
const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-gray-300 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-[#d1d5db]" : ""
        } `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePicture} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div>
            <p className="font-bold text=gray-200">{conversation.fullName}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
