const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validatePostData } = require("../utils/validators");
const postRouter = express.Router();
const Posts = require("../models/posts");

postRouter.post("/user/post/add", userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const {_id} = loggedInUser;
        const {photoUrl, desc, keywords} = req.body;
        validatePostData(req);
        const newPost = new Posts({
            fromUserId:_id,
            photoUrl:photoUrl,
            desc:desc,
            keywords:keywords
        });

        const data = await newPost.save();
        res.status(200).json({message:"Post send successfully", data});


    } catch (error) {
        res.status(400).json({message:"Something went wrong "+error.message});
    }
})

module.exports = postRouter;
