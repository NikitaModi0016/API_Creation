const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments:
            [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],



    },
    { timestamps: true }
);
module.exports = mongoose.model("posts", postSchema);