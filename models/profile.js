import mongoose from 'mongoose'
const Schema = mongoose.Schema


const captionSchema = new Schema ({
  conent: String, 
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})


const memeSchema = new Schema ({
  name: String,
  url: String,
  caption: [captionSchema]
}, {
  timestamps: true
})


const profileSchema = new Schema({
  name: String,
  avatar: String,
  meme: [memeSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}