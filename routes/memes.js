import { Router } from 'express'
import * as memeCtrl from '../controllers/meme.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()


router.get('/', isLoggedIn, memeCtrl.allMemes)

router.get('/show/:id', isLoggedIn, memeCtrl.show)

router.post('/show/:id', isLoggedIn, memeCtrl.createCaption)

router.delete('/memes/:id/captions/:captionId', isLoggedIn, memeCtrl.delete)


export {
  router
}