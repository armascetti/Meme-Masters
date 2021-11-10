import mongoose from 'mongoose'
const Schema = mongoose.Schema


const captionSchema = new Schema ({
  content: String, 
  memeId: String, 
  avatar: String,
   owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})


const Caption = mongoose.model('Caption', captionSchema)

export {
  Caption 
}