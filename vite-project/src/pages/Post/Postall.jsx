import React, { useContext, useEffect,useState } from 'react'
import newRequest from '../../utils/newRequest';
import Post from '../../components/post/Post';
import { AuthContext } from '../../context/AuthContext';
import "./postall.css"
import Sidebar from '../../components/sidebar/Sidebar';
const Postall = () => {
    const [posts,setPosts] = useState([]);
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        const getPosts = async()=>{
        try{
           const postlist = await newRequest.get(`/posts/${user._id}/post`)
           setPosts(postlist.data)
           console.log(postlist.data)
           
        }catch(error){}
    };getPosts();
    },[])
    console.log(posts)
  return (
    <>
    <div className='allpostsmain'>
      <div className='allpostsleft'><Sidebar/></div>
    <div className='allpostsright'>
      <div className='posts'>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
        </div>
    </div>
    </div>
    </>
  )
}
export default Postall;
