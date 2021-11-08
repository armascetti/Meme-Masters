import { Router } from 'express'
import * as memeCtrl from '../controllers/meme.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()


router.get('/', isLoggedIn, memeCtrl.allMemes)

router.get('/show/:id', isLoggedIn, memeCtrl.show)

export {
  router
}