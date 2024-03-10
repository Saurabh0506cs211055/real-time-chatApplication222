
import Post from "../model/post.model.js";
import user from "../model/user1.model.js";

//add post
export const addPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.param.id);
    if (post.userId === req.params.id) {
      await post.updateOne({ $set: req.body });
      res.status(201).send("post update successfully");
    } else {
      res.status(201).send("you can update your post only");
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

// delete post

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.param.id);
    if (post.userId === req.params.id) {
      await post.deleteOne();
      res.status(201).send("post update successfully");
    } else {
      res.status(201).send("you can update your post only");
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

// like / dislike post

export const LikeDislikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(201).send("post like successfully");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(201).send("post is disliked");
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

// get post

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.param.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(403).json(error);
  }
};

// getALl post

export const getAllPost = async (req, res, next) => {
  try {
    const User = await user.findOne({username:req.params.username});
    const posts = await Post.find({userId: User._id});
    console.log(posts)
    res.status(201).json(posts);
  } catch (error) {
    res.status(403).json(error);
    console.log(error)
  }
}

// get Timeline post
export const getTimelinePost = async (req, res, next) => {
  try {
    const currentUser = await user.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(403).json(error);
  }
};
export const allAppPost = async(req,res,next)=>{
  try{
    const post = await Post.find({});
    const Posts = await Promise.all(
      post.map((userID) => {
        return Post.findOne(userID);
      })
    );

     let postList = [];
     Posts.map((friend) => {
      const { _id, userId,img,desc,likes,postTitle } = friend;

      postList.push({ _id, userId,img,desc,likes,postTitle });
    });
    res.status(201).json(postList);

  }catch(error){
    res.status(500).json(error)
  }
}
// get job post
