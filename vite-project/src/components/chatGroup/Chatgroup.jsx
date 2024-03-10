import { useContext, useEffect, useState } from "react";
import "./chatgroup.css";
import newRequest from "../../utils/newRequest";

import ONLINE from "../../context/Onlineuser";

export default function Chatgroup({ onlineUsers, currentId}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [currentdata,setCurrentdata] = useState([])
  const Online = useContext(ONLINE)
  
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  useEffect(() => {
    const getFriends = async () => {
      const res = await newRequest.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await newRequest.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      if(res.data[0]?._id){
      setCurrentdata(res.data);
      console.log(currentId,user._id,currentdata[0]._id);
      Online.setOnline({SenderId:currentId,ReciverId:user._id,currentChat:currentdata})
      console.log(Online.online)

      }
      else{
        console.log("no response")
        const res = await newRequest.post(`/conversations/${currentId}/${user._id}`)
        setCurrentdata(res.data);
        console.log(currentId,user._id,currentdata[0]._id);
        Online.setOnline({SenderId:currentId,ReciverId:user._id,currentChat:currentdata})
        console.log(Online.online)
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  return (<>
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={()=> {handleClick(o)}}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
    </>
  );
}