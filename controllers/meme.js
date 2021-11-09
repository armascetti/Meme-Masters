import { memeApi } from '../config/api.js'
import { Profile } from '../models/profile.js'

function allMemes(req, res) {
  memeApi.get('/get_memes')
    .then(response => {
      let results = response.data.data.memes
      // let getAllMemes = results.memes[19].url
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
  memeApi.get('/get_memes')
    .then(response => {
      let results = response.data.data.memes
      let memeId = req.params.id
      res.render('memes/show' ,{
        title: "helloooo",
        results,
        memeId
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function createCaption(req, res){
  console.log("CREATING CAPTION", req.params.id)
res.redirect(`/allMemes/show/${req.params.id}`)
}


export {
    allMemes,
   show,
   createCaption, 
  }