
import Jwt from "jsonwebtoken";
import user from "../model/user1.model.js"
import bcrypt from "bcrypt"

export const createUser = async(req,res,next)=>{
    try{
        const password =  bcrypt.hashSync(req.body.password,6)
        const USER = new user({
            ...req.body,
            password:password,
        })
        await USER.save();
       
        res.status(201).send("user is created successfully");
       
    }catch(error){
        res.status(403).json(error)
    }
}

export const login = async(req,res,next)=>{
    try{
        const USER = await user.findOne({username:req.body.username});
        if(!USER)return res.status(403).send("user is not exist");

        const isCorrect = bcrypt.compareSync(req.body.password,USER.password)
        if(!isCorrect)return res.status(403).send("password is incorrect");

        const token = Jwt.sign({
          userEmail: USER.email,
          username:USER.username
        },process.env.JWT_KEY)

        const {password,...info} = USER._doc
        res.cookie("accesssToken",token,{httpOnly:true}).status(201).send(info)
        
    }catch(error){
        res.status(403).send("somethings went wrong")
    }
}


export const logout = async(req,res,next)=>{
    res.clearCookies("accessToken",{
        sameSite:"none",secure:true,
    }).status(201).send("logout successfull")
}