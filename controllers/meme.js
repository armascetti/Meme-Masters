import { memeApi } from '../config/api.js'
import { Caption } from '../models/caption.js'
import _ from 'lodash'
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
  /**
   * ______________________________________________________
   * TODO: Refactor into a single property-specific query
   * rather than pulling all 'caption' documents and then
   * filtering
   */
  // TODO: If we have intermittent results here,
  // change this to be the start of the promise chain:
  
  /**
   * ______________________________________________________
   */
  const user = req.user.profile
  /**
   * TODO: Refactor the request (in the form in .ejs) to
   * pass the meme URL with it so that you don't have to 
   * go fetch *ALL* the memes again in order to show it
   * with the caption.
   */
   let captions = []
   Caption.find({ memeId: req.params.id })
    .then((arrayOfCaptions) => {
      console.log("ARRAYYYY of captions", { captions, arrayOfCaptions })
      captions = captions.concat(arrayOfCaptions)
      return memeApi.get('/get_memes')
    })
    .then(allOfTheMemes => {
      // TODO: Use the request data for this instead
      // of asking the API for all this data again
      // (because you don't need all results)
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
  // TODO: Add the meme URL to 'newRequest' here
  // after it's been added to the request in the form
  Caption.create(newRequest)
    .then(captions => {
      console.log('Created a caption:', captions)
      res.redirect(`/allMemes/show/${req.params.id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function deleteCaption(req, res) {
  console.log("DATAAAA",req.params)
Caption.findByIdAndRemove(req.params.captionId)
.then( results =>{
console.log("RESULTS", results)
res.redirect(`/allMemes/show/${req.params.id}`)
})
  // TODO: delete the caption with id = <req.params.id> from the DB
  // TODO: redirect to 'memes/show/${req.params.id}'
}

export {
  allMemes,
  show,
  createCaption,
  deleteCaption as delete,
}