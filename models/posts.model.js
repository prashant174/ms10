const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    user: { type: ObjectId, ref: 'User' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [{
      user: { type: ObjectId, ref: 'User' },
      text: String,
      createdAt: Date
    }]

})

const PostModel=mongoose.model("user",postSchema)

module.exports={PostModel}