import React, { useContext, useEffect,useState } from 'react'
import newRequest from '../../utils/newRequest';
import Post from '../../components/post/Post';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/sidebar/Sidebar';

const Job = () => {
    const [posts,setPosts] = useState([]);
    const {user} = useContext(AuthContext)
    const[job,setJob] = useState({})
    
    useEffect(()=>{
        const getPosts = async()=>{
        try{
           const postlist = await newRequest.get(`/posts/${user._id}/post`)
           setPosts(postlist.data)
           setJob(postlist.data.length)
           
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
        {job > 0 ?posts.map((p) => (
          <>
         {p.postTitle == "job" ? <Post key={p._id} post={p} />:<>wait for the new job related post</>}
         </>
        )):<></>}
        </div>
    </div>
    </div>
    </>
  )
}

export default Job