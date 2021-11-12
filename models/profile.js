import mongoose from 'mongoose'
const Schema = mongoose.Schema

// const newMemeSchema = new Schema ({
//   name: String,
//   url: String,
// })

const profileSchema = new Schema({
  name: String,
  avatar: String,
  favoriteMemeUrls: []
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}