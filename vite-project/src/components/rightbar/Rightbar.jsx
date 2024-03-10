import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
export default function Rightbar({ user }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [appUser, setAppUser] = useState([]);
  //const appCurrentuser = JSON.parse(localStorage.getItem("currentLoginuser"));
  const [followed, setFollowed] = useState(false);
  const [friendsnumber, setFrriendsnumber] = useState(0);
  const [friendsnumber1, setFrriendsnumber1] = useState(0);
  const [moreInfo, setMoreInfo] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      setFollowed(currentUser.followings.includes(user?._id) ? true : false);
      try {
        const friendList = await newRequest.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
        setFrriendsnumber(friendList.data.length);
        setFrriendsnumber1(user.followers.length);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  /// get all app user person
  useEffect(() => {
    const getUsers = async () => {
      try {
        const USERS = await newRequest.get("/users/app");
        setAppUser(USERS.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleClick = async (e) => {
    try {
      if (followed) {
        await newRequest.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await newRequest.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const handleClick2 = async () => {
    try {
    //  await newRequest.post("/auth/logout/" + user._id);
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload(false);
    } catch (error) {}
  };
  const handleClick3 = async () => {
    try {
      navigate("/update");
      window.location.reload(false);
    } catch (error) {}
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>

        <video autoPlay loop muted id="video">
          <source src="https://v4.cdnpk.net/videvo_files/video/free/video0459/small_watermarked/_import_60c847d77fb4e2.81699430_FPpreview.mp4"></source>
        </video>
        <h4 className="rightbarTitle">Make friends</h4>
        <ul className="rightbarFriendList">
          {appUser.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
          <button
            className="rightbarFollowButton"
            onClick={() => setMoreInfo(!moreInfo)}
          >
           {moreInfo ? <>Show Less</> :<>Show More</>}
          </button>
          {moreInfo == true && (
            <div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Education:</span>
                <span className="rightbarInfoValue">{user.education}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Profile:</span>
                <span className="rightbarInfoValue">{user.jobTitle} profile</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Experience:</span>
                <span className="rightbarInfoValue">{user.jobExperience} profile</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Following:</span>
                <span className="rightbarInfoValue">{friendsnumber}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Follower:</span>
                <span className="rightbarInfoValue">{friendsnumber1}</span>
              </div>
            </div>
          )}
        </div>
        <button className="rightbarFollowButton" onClick={handleClick3}>
          update
        </button>
        <button className="rightbarFollowButton" onClick={handleClick2}>
          Logout
        </button>
        {friendsnumber > 0 ? (
          <h4 className="rightbarTitle">User friends</h4>
        ) : (
          <h4 className="rightbarTitle">User have no friends</h4>
        )}
        <div className="rightbarFollowings">
          {friendsnumber > 0 ? (
            friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <h1></h1>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
