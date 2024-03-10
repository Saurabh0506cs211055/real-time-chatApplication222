import Group from "../model/group.model.js"
import Conversation from "../model/conversation.model.js";

// create conversation
export const createConversation = async (req, res, next) => {
  const convesation = new Conversation({
    members: [req.params.senderId, req.params.reciverId],
  });
  try {
    const saveconversation = await convesation.save();
    res.status(201).json(saveconversation);
  } catch (error) {
    res.status(403).send("some things went wrong");
  }
};

// get conversation user

export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conversation two user

export const gettwoconversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $all: [req.params.firstuserId, req.params.seconduserId] },
    });
    console.log(conversation)
    res.status(201).json(conversation);
  } catch (error) {
    res.status(403).send("somethings went wrong");
  }
};
// create group conversation 
export const creatgroupConversation = async(req,res,next)=>{

  try{
    const group = await Group.findById(req.params.groupId);
    let MemberList= [];
    const member = await Promise.all(
      group.groupMember.map((g)=>{
       MemberList.push(g)
      })
    )
      const conversation = new Conversation({
        members:MemberList
      })
      await conversation.save();
      res.status(201).json(conversation);
  }catch(error){
    res.status(201).json(500)
  }
}
export const groupCoversation = async(req,res,next)=>{
  try{
    const group = await Group.findById(req.params.groupId)
    if(group.groupMember.includes(req.params.userId)){
    const conversation = await Conversation.find({
      members: {$all: [group.groupMember]  },
    });
    res.status(201).json(conversation)
  }
  else{
    res.status(201).json("you are not member of that community")
  }
   
  }catch(error){
    res.status(500).json(error)
  }
}