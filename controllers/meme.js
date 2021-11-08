import { memeApi } from '../config/api.js'


function allMemes(req, res) {
  memeApi.get('/get_memes')
    .then(response => {
      let results = response.data.data.memes
      // let getAllMemes = results.memes[19].url
      console.log(JSON.stringify({ responseData: response.data }, null, 2))
      res.render('memes', {
        title: "All of the Memes!",
        results
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function addCaption(req, res) {
  memeApi.get('/get_memes')
    .then(response => {
      let results = response.data.data.memes
      let memeId = req.params.id
      res.render('captions', {
        title: "helloooo",
        results,
        memeId
      })
        // .catch(err => {
        //   console.log(err)
        //   res.redirect('/')
        // })
    })
}

export {
    allMemes,
    addCaption,
  }