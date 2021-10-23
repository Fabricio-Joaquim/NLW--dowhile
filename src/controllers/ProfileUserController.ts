import {Request, Response} from 'express'
import {ProfileUserService} from '../services/ProfileUserService'
export class ProfileUserController{

    async handle(req: Request, res: Response){

        const service = new ProfileUserService()
        const result = await service.execute(req.user_id)
    
        return res.json(result)
    }
}