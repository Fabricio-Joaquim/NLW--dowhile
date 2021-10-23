import {Router} from 'express'
import {AuthenticationUserController} from './controllers/AuthenticationUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLast3MessageController } from './controllers/GetLast3MessageController'
import { ProfileUserController } from './controllers/ProfileUserController'
import {Authenticated} from './middleware/Authenticated'

const router = Router()

router.post('/authenticate', new AuthenticationUserController().handle)

router.post('/messages', Authenticated, new CreateMessageController().handle)

router.get('/messages/last3', new GetLast3MessageController().handle)

router.get('/profile',Authenticated, new ProfileUserController().handle)
export {router}