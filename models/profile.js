import mongoose from 'mongoose'
const Schema = mongoose.Schema


const captionSchema = new Schema ({
  content: String, 
   owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
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

const Caption = mongoose.model('Caption', captionSchema )

export {
  Profile,
  Caption 
}