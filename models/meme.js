import mongoose from 'mongoose'
const Schema = mongoose.Schema

const memeSchema = new Schema ({
  name: String,
  url: String,
}, {
  timestamps: true
})


const Meme = mongoose.model('Meme', memeSchema)

export {
  Meme
}