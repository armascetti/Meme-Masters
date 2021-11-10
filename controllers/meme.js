import { memeApi } from '../config/api.js'
import { Caption } from '../models/caption.js'
import { Profile } from '../models/profile.js'


function allMemes(req, res) {
  memeApi.get('/get_memes')
    .then(response => {
      let results = response.data.data.memes
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
   let captions = []
  Caption.find({}, function(err, docs){
    docs.forEach(item => {
      if (item.memeId === req.params.id){
        captions.push(item)
      }
    })
  })
  console.log("ARRAYYYY of captions", captions)
  let user = req.user.profile.avatar
  memeApi.get('/get_memes')
    .then(meme => {
      let results = meme.data.data.memes
      let memeId = req.params.id
      res.render('memes/show', {
        title: "Select a Meme",
        results,
        memeId,
        meme,
        user,
        captions
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
  req.body.avatar = req.user.profile.avatar
  Caption.create(req.body)
    .then(captions => {
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