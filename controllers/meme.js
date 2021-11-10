import { memeApi } from '../config/api.js'
import { Caption } from '../models/caption.js'
import { Profile } from '../models/profile.js'

function allMemes(req, res) {
  memeApi.get('/get_memes')
    .then(response => {
      let results = response.data.data.memes
      console.log(JSON.stringify({ responseData: response.data }, null, 2))
      res.render('memes/index', {
        title: "All of the Memes!",
        results
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}


function show(req, res) {
  let user = req.user.profile.avatar
  memeApi.get('/get_memes')
    .then(meme => {
      let results = meme.data.data.memes
      let memeId = req.params.id
      res.render('memes/show', {
        title: "helloooo",
        results,
        memeId,
        meme,
        user
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function createCaption(req, res) {
  let user = req.user.profile._id
  req.body.owner = user 
  Caption.create(req.body)
  .then(captions => {
 res.render('allMemes/captions', {
   captions
 })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
 })
}

export {
  allMemes,
  show,
  createCaption,
}