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
  let captions = Caption.find({memeId: req.params.id})
  console.log("captions from database", captions)
  memeApi.get('/get_memes')
    .then(meme => {
      let results = meme.data.data.memes
      let memeId = req.params.id
      res.render('memes/show', {
        title: "helloooo",
        results,
        memeId,
        meme,
        user,
        captions,
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
  req.body.memeId = req.params.id
  Caption.create(req.body)
    .then(captions => {
      console.log("CAPTIONNSSS", captions)
      res.redirect(`/allMemes/show/${req.params.id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

export {
  allMemes,
  show,
  createCaption,
}