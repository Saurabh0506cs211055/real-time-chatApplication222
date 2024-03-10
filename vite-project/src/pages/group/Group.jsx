import React, { useContext, useEffect, useRef, useState } from "react";
import "./group.css";
import { Cancel, CloudDone, SignalCellularConnectedNoInternet4BarSharp } from "@material-ui/icons";
import newRequest from "../../utils/newRequest";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CloseFriend from "../../components/closeFriend/CloseFriend";
import ONLINE from "../../context/Onlineuser";
import { io } from "socket.io-client";
import Message from "../../components/message/Message";
export const Group = () => {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [creategroup, setCreategroup] = useState(false);
  const groupname = useRef();
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [member, setMember] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [membername, setMembername] = useState();
  const [friendsnumber, setFriendsnumber] = useState();
  const [getGroup, setGetGroup] = useState([]);
  const [groupnumber, setGroupnumber] = useState();
  const Online = useContext(ONLINE);
  const [groupMemberList,setGroupMemberList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);

  const scrollRef = useRef();
  useEffect(() => {
    const getFriends = async () => {
      const res = await newRequest.get("/users/friends/" + user?._id);
      setFriends(res.data);
      console.log(res.data.length);
      setFriendsnumber(res.data.length);
    };

    getFriends();
  }, [user._id]);
  useEffect(() => {
    const getGroupofuser = async () => {
      try {
        const res = await newRequest.get("/group/" + user._id);
        setGetGroup(res.data);
        setGroupnumber(res.data.length);
     
        console.log(groupnumber);
        console.log(getGroup);
      } catch (error) {}
    };
    getGroupofuser();
  }, [groupnumber]);

  useEffect(() => {
    setCurrentChat(Online.online.currentChat[0]);
    console.log(Online.online);
  });
  console.log(currentChat);
 
  console.log(member)
  console.log(groupMemberList)
 
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.groupMember.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on(
      "getUsers",
      currentChat?._id
      //(users) => {
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
      //}
    );
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await newRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(()=>{
    const getGroupMember = async()=>{
      console.log(Online.online.ReciverId)
     try{
       const res = await newRequest.get("/group/groupmember/" + Online.online.ReciverId);
       setMember(res.data);
       console.log(res.data)
       setGroupMemberList(res.data.length)
         }catch(error){}
    };getGroupMember();
   },[currentChat])

  console.log(messages);
  const handleClick2 = async (c) => {
    console.log(c._id);
    let reciverId = [];
    const Reciver = c.groupMember.find((member) => {
      if (member !== user._id) {
        reciverId.push(member);
      }
    });
    console.log(reciverId);
    const res = await newRequest.get(
      `/conversations/group/${user._id}/find/${c._id}`
    );
    console.log(res.data);
    Online.setOnline({
      senderId: user._id,
      ReciverId: c._id,
      currentChat: res.data,
    });
    console.log(Online.online);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    console.log(messages)
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(receiverId);
    setMember(receiverId);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      reciverId: Online.online.ReciverId,
      text: newMessage,
    });

    try {
      const res = await newRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleClick = async (e) => {
    e.preventDefault();

    const user1 = {
      groupname: groupname.current.value,
      desc: desc.current.value,
      groupMember: memberList,
    };
    console.log(user1);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      user1.groupPicture = fileName;
      console.log(user);
      try {
        await newRequest.post("/upload", data);
      } catch (err) {}
    }
    try {
      await newRequest.post("/group/" + user._id, user1);
      window.location.reload();
    } catch (err) {}
  };

  const handleClick123 = async (id) => {
    if (memberList.indexOf(id) >= 0) {
      setMemberList([...memberList]);
      setMembername(memberList.length);
    } else {
      setMemberList([...memberList, id]);
    }
    console.log(memberList);
  };

  return (
    <>
      <div className="group">
        <div className="group-left">
          <div className="Activegroup">
            <input
              className="loginInput1212"
              placeholder="Search for friends"
            />
            {groupnumber > 0 ? (
              getGroup.map((g) => (
                <li className="sidebarFriend1" onClick={() => handleClick2(g)}>
                  <img
                    className="sidebarFriendImg1"
                    src={
                      g.groupPicture
                        ? PF + g.groupPicture
                        : PF + "/person/noAvatar.png"
                    }
                    alt=""
                  />
                  <span className="sidebarFriendName1">{g.groupname}</span>
                </li>
              ))
            ) : (
              <>no community</>
            )}
          </div>
        </div>
        {creategroup ? (
          <div className="creategroupForm">
            <form className="formofgroup" onSubmit={handleClick}>
              <div className="logo12"> WebpiK.com</div>
              <div className="formmid">
                <label className="update-element">
                  <input
                    placeholder="group name / community name"
                    ref={groupname}
                    className="loginInput1212"
                  />
                </label>
                <label className="update-element">
                  <textarea
                    placeholder="short group desc "
                    ref={desc}
                    className="inputtext"
                  />
                </label>
                <div className="share12">
                  {file && (
                    <div className="shareImgContainer">
                      <img
                        className="shareImg12"
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                      <Cancel
                        className="shareCancelImg12"
                        onClick={() => setFile(null)}
                      />
                    </div>
                  )}
                  <label className="update-element">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <h5>choose icon</h5>
                  </label>
                </div>
                <div className="groupMember">
                  {membername > 0 ? (
                    <div className="select Admin">
                      {memberList.map((member) => {
                        <>
                          <>{member}</>
                        </>;
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <button className="rightbarFollowButton" type="submit">
                CREATE GROUP
              </button>
            </form>
            <div className="formbottom">
              <div className="rightbarFollowings1">
                <>Add group member</> <br />
                <br />
                {friendsnumber > 0 ? (
                  friends.map((friend) => (
                    <div onClick={() => handleClick123(friend._id)}>
                      <CloseFriend key={friend._id} user={friend} />
                    </div>
                  ))
                ) : (
                  <> makes connection with users to make group</>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="group-mid">
        <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat?.members ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
            
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        </div>
        </div>
        <div className="group-right">
          <div className="grouptop">
          <button
            className="creategroupButton"
            onClick={() => setCreategroup(!creategroup)}
          >
            create  group
          </button>
          </div>
          <div className="right-bottom">
          {
        groupMemberList > 0 ?(
         <div className="groupMember">
          <h3 className="groupMembername">group member</h3>
          {member.map((g)=>(
            <CloseFriend key={g._id} user = {g}/>
          ))}
         </div>
        ):<></>
          }
          </div>
        </div>
      </div>
    </>
  );
};
