import { memeApi } from '../config/api.js'
import { Caption } from '../models/caption.js'
import _ from 'lodash'




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
  const user = req.user.profile
  let captions = []
  Caption.find({ memeId: req.params.id })
    .then((arrayOfCaptions) => {
      captions = captions.concat(arrayOfCaptions)
      return memeApi.get('/get_memes')
    })
    .then(allOfTheMemes => {
      res.render('memes/show', {
        title: "Select a Meme",
        results: allOfTheMemes.data.data.memes,
        memeId: req.params.id,
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
  const newRequest = _.cloneDeep(req.body);
  newRequest.owner = user
  newRequest.memeId = req.params.id
  newRequest.avatar = req.user.profile.avatar
  Caption.create(newRequest)
    .then(captions => {
      res.redirect(`/allMemes/show/${req.params.id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function deleteCaption(req, res) {
  Caption.findByIdAndRemove(req.params.captionId)
    .then(results => {
      res.redirect(`/allMemes/show/${req.params.id}`)
    })
}



export {
  allMemes,
  show,
  createCaption,
  deleteCaption as delete,
}