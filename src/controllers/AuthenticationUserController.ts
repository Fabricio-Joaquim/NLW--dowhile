import {Request, Response} from 'express'
import {AuthenticationUserService} from '../services/AuthenticationUserService'
export class AuthenticationUserController{

    async handle(req: Request, res: Response){
        const {code} = req.body
        const service = new AuthenticationUserService();
       try {
        const result = await service.execute(code)
        return res.json(result)

       } catch (error) {
           return res.json(error.message)
       }

    }
}