import { Router } from 'express'
import * as memeCtrl from '../controllers/meme.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()


router.get('/', function(req, res){
  res.render('index', {title: 'Home Page', user: req.user ? req.user : null})
})

//router.get('/allMemes', isLoggedIn, memeCtrl.allMemes)

//router.get('/show/:id', isLoggedIn, memeCtrl.show)


export {
  router
}
