import { useState } from "react";
import ONLINE from "./Onlineuser";

export const OnlineProvider = ({children})=>{
  const [online,setOnline] = useState({SenderId:"?",ReciverId:"?",currentChat:"?"});
 

 return(
  <ONLINE.Provider value = {{online,setOnline}}>
  {children}
</ONLINE.Provider>
 )
}