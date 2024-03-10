import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import newRequest from "../../utils/newRequest";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const [appUser, setAppUser] = useState([]);
  const {user}  = useContext(AuthContext);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const USERS = await newRequest.get("/users/app");
        setAppUser(USERS.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  console.log(user)
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
          <Link className = "LINK"to="/chat">   <span className="sidebarListItemText">Chats</span></Link>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <Link className = "LINK"to="/post">  <span className="sidebarListItemText">posts</span></Link>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <Link className = "LINK"to="/group"> <span className="sidebarListItemText">Groups</span></Link>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <Link className = "LINK"to="/job">  <span className="sidebarListItemText">Job</span></Link>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {appUser.map((u) => (
            
            <>
           {
           <CloseFriend key={u.id} user={u} />}
           </>
          ))}
        </ul>
      </div>
    </div>
  );
}
