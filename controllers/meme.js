import { memeApi} from '../config/api.js'


function allMemes(req, res){
  memeApi.get('/get_memes')
.then(response => {
response.data.data
  //console.log(JSON.stringify({ responseData: response.data }, null, 2))
  res.render('memes', {
    title: "All of the Memes!"
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