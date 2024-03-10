import Group from "../model/group.model.js"
import user from "../model/user1.model.js"
export const createGroup = async(req,res,next)=>{
    try{
      const createGroup = new Group({
        ...req.body,
        groupCreater:req.params.userId,
        groupAdmin:[req.params.userId],
      })
      await createGroup.save();
     res.status(201).json(createGroup)
  
    }catch(error){
      console.log(error`              `)
      res.status(500).json(error)
    }
  }
  export const getGroup = async(req,res,next)=>{
    try{
      const conversation = await Group.find({
        groupMember: {  $in : [req.params.Id] },
      })
    res.status(201).json(conversation)
    }catch(error){
      res.status(500).json(error)
    }
  }
  export const getsingleGroup = async(req,res,next)=>{
    try{
      const conversation = await Group.findById(req.params.groupId)
    res.status(201).json(conversation)
    }catch(error){
      res.status(500).json(error)
    }
  }
  export const singleGroupexist = async(req,res,next)=>{
    try{
      const conversation = await Group.findById(req.params.groupId)
      if(conversation.groupMember.includes(req.params.userId)){
        await conversation.updateOne({$pull:{groupMember:req.params.userId}});
        res.status(201).json("group exist successfully")
      }
      else{
        res.status(201).json("you are not a member of that group")
      }
    
    }catch(error){
      res.status(500).json(error)
    }
  }


  export const groupMember = async(req,res,next)=>{
    try{
      const group = await Group.findById(req.params.groupID)
      const Gr = await Promise.all(
        group.groupMember.map((g)=>{
          return user.findById(g)
        })
      )
      let MemberList =[];
     Gr.map((g)=>{
      const { _id, username, profilePicture } = g;
       MemberList.push({ _id, username, profilePicture });
     })

      res.status(201).send(MemberList)
    }catch(error){
      res.status(500).json(error)
    }
  }