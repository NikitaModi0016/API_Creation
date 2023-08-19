const Post = require("../model/Post");


//CRUD Operations
//create new post
const createPostController = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        await newPost.save()
        res.status(201).send({
            success: true,
            message: 'Post Created!',
            newPost,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in CreatePost API',
            error
        })
    }
}

// Get a post

const getPostController = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        res.status(201).send({
            success: true,
            message: 'Post',
            post,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in GetPost API',
            error
        })
    }
}


//Update a Post

const updatePostController = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await Post.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            return res.status(201).send({
                success: true,
                message: 'Post Updated',
            })
        }
        else {
            return res.status(403).send({
                success: true,
                message: 'Action Forbidden',

            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in UpdatePost API',
            error
        })
    }
}

//Delete a Post

const deletePostController = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await Post.findById(id)
        if (post.userId === userId) {
            await post.deleteOne();
            return res.status(201).send({
                success: true,
                message: 'Post Deleted Successfully!',
            })
        }
        else {
            return res.status(403).send({
                success: true,
                message: 'Action Forbidden',

            })

        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in DeletePost API',
            error
        })
    }
}
//Like a Post
const likePostController = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Post.findById(id)
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            return res.status(201).send({
                success: true,
                message: 'Post liked!',
            })
        }
        else {
            await post.updateOne({ $pull: { likes: userId } })
            return res.status(201).send({
                success: true,
                message: 'Post Unliked!',
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in LikePost API',
            error
        })
    }
}

//Comment on a post
const commentPostController = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post.comments.includes(userId)) {
            await post.updateOne({ $push: { comments: userId } })
            return res.status(201).send({
                success: true,
                message: 'Commented on a post!',
            })
        }
        else {
            await post.updateOne({ $pull: { comments: userId } })
            return res.status(201).send({
                success: true,
                message: 'Comment is deleted!',
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in CommentPost API',
            error
        })
    }
}



module.exports = {
    createPostController,
    getPostController,
    updatePostController,
    deletePostController,
    likePostController,
    commentPostController

};