import React, { useState } from 'react'
import "./Update.css"
import {
  Cancel,
} from "@material-ui/icons";
import { useRef } from "react";
import {useNavigate} from "react-router-dom"
import newRequest from "../../utils/newRequest";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


 const Update = () => {  
  
  const { user } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const city = useRef();
  const relationship = useRef();
  const from = useRef();
  const desc = useRef();
  const education = useRef();
  const category = useRef();
  const experience  = useRef();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } 
    const user1 = {
      desc: desc.current.value,
      userId:user._id,
      email: email.current.value,
      password: password.current.value,
      city:city.current.value,
      from:from.current.value,
      relationship:relationship.current.value,
      education:education.current.value,
      jobTitle:category.current.value,
      jobExperience:experience.current.value,
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      user1.profilePicture = fileName;
      console.log(user);
      try {
        await newRequest.post("/upload", data);
      } catch (err) {}
    }
    if (file2) {
      const data = new FormData();
      const fileName2 = Date.now() + file2.name;
      data.append("name", fileName2);
      data.append("file", file2);
    user1.coverPicture = fileName2;
      console.log(user);
      try {
        await newRequest.post("/upload", data);
      } catch (err) {}
    }
 
   
      
      try {
        await newRequest.put("/users/"+user._id, user1);
        window.location.reload();
      } catch (err) {}
    };  

   
  return (
  <div className = "update">
    <div className='updateWrapper'>
      <div className='update-left'>
      <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
      </div>
      <form className='updateform' onSubmit={handleClick}  >
       <div className='updateform1'>
        <div className='update-mid'>
          <label className='update-element'>
          <input
              placeholder="Email"
              ref={email}
              className="loginInput1"
              type="email"
            />
          </label>
          <label className='update-element'>
          <input
              placeholder="Password"
              ref={password}
              className="loginInput1"
              type="password"
              minLength="6"
            />
          </label>
          <label className='update-element'>
          <input
              placeholder="Password Again"
              ref={passwordAgain}
              className="loginInput1"
              type="password"
            />
          </label>
          
          <label className='update-element'>
          <input
              placeholder="city"
              ref={city}
              className="loginInput1"
            />
          </label>
          <label className='update-element'>
          <input
              placeholder="from"
              ref={from}
              className="loginInput1"
            />
          </label>
          <label className='update-element'>
          <input
              placeholder="relationship"
              ref={relationship}
              className="loginInput1"
            />
          </label>
          <label className='update-element'>
          <textarea
              placeholder="education / university "
              ref={education}
              className="inputtext"
            />
          </label>
          <label className='update-element'>
          <textarea
              placeholder="user desc"
              ref={desc}
              className="inputtext">
            </textarea>
          </label>
          <label className='update-element'>
          <textarea
              placeholder="category : example :- student/freelances/professionals /skills"
              ref={category}
              className="inputtext"
            />
          </label>
        </div>
        <div className='update-right'>
        <label className='update-element'>
          <input
              placeholder="add experience "
              ref={experience}
              className="loginInput1"
            />
          </label>
          <div className='share1'>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          
          </div>
        )}
          <label className='update-element'>
          
          <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <h3>profile picture</h3>
          </label>
          </div>
          <div className='share1'>
          {file2 && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file2)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile2(null)} />
          </div>
        )}
          <label className='update-element'>
            <h3>share cover</h3>
          <input
                style={{ display: "none" }}
                type="file"
                id="file1"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile2(e.target.files[0])}
              />
          </label>

          </div>
          <button className="loginButton1" type="submit">
         UPDATE 
            </button>
        </div>
        </div>
       
      </form>

     </div> 
  </div>
  );
}


 

export default Update;