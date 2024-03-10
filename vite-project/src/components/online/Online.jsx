import { AuthContext } from "../../context/AuthContext";
import { useState ,useContext} from "react";
import { Add, Remove } from "@material-ui/icons";
import "./online.css";
import { useNavigate } from "react-router-dom";
const appCurrentuser = JSON.parse(localStorage.getItem("currentLoginuser"))

export default function Online({user}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const { user:currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  

  const handleClick1 = async () => {
    
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
    } catch (err) {
    }
  };
const handleClick2 = async()=>{

 try{
 navigate(`/profile/${user.username}`)

 }catch(error){
  
 }
}
  return (
    <>
    {user.username !==appCurrentuser.data.username &&(
  <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt=" " />
        <span className="rightbarUsername">
          <span className="rightbarUsername1" onClick={handleClick2}>{user.username}</span>
          </span>
      {user.username !== currentUser.username  && (
          <button className="rightbarFollowButton1" onClick={handleClick1}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
      )}
     </div>  
        
    </li>)}
    </>
  );
}
