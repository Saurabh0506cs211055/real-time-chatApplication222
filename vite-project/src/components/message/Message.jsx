import { useContext } from "react";
import "./message.css";
import { format } from "timeago.js";


export default function Message({ message, own }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src= {
           own?.profilePicture
              ? PF + own.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}