import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
    .then(profiles => {
      res.render("profiles/index", {
        profiles,
        title: "Profiles"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}


function show(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      Profile.findById(req.user.profile._id)
        .then(self => {
          const isSelf = self._id.equals(profile._id)
          res.render("profiles/show", {
            profile,
            title: `Welcome to ${profile.name}'s Profile`,
            self,
            isSelf
          })
        })
    })
}

function addMeme(req, res){
  console.log("ADDD MEMEEE", req.body)
  res.redirect("/profiles/show")
}


export {
  index,
  show,
  addMeme 
}