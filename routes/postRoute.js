const express = require('express')
const { createPostController, getPostController, updatePostController, deletePostController, likePostController, commentPostController } = require('../controller/postController')

const router = express.Router();

router.post('/newpost', createPostController)

router.get('/:id', getPostController)

router.put('/:id', updatePostController)

router.delete('/:id', deletePostController)

router.put('/:id/like', likePostController)

router.put('/:id/comment', commentPostController)

module.exports = router;