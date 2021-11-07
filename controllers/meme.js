import { memeApi} from '../config/api.js'


function allMemes(req, res){
  memeApi.get('/get_memes')
.then(response => {
  let results= response.data.data
  let getAllMemes = results.memes[2].url
  console.log(JSON.stringify({ responseData: response.data }, null, 2))
  res.render('memes', {
    title: "All of the Memes!",
   getAllMemes
  })
})
.catch(err =>{
  console.log(err)
  res.redirect('/')
})
}


export {
  allMemes,
}