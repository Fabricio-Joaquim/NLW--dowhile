import axios from 'axios'
import prismaClient from '../prisma'
import {sign} from 'jsonwebtoken'

interface Token{
    access_token:string;
}

interface User{
    avatar_url:string;
    login:string;
    id:number;
    name:string;
}
export class AuthenticationUserService{
    async execute(code:string) {
        const url_base ="https://github.com/login/oauth/access_token" 
        const {data:Token} = await axios.post<Token>(url_base,null,{
            params:
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers:{
                "Accept": "application/json"
            }
        });

        const res = await axios.get<User>('https://api.github.com/user',{headers:{authorization:`Bearer ${Token.access_token}`}})

        const{login, id, avatar_url, name} = res.data
        
        let user = await prismaClient.user.findFirst({
            where:{
                github_id:id
            }
        })
       const date = user? true:false

        if(!date){           
         user = await prismaClient.user.create({data:{
            name:name,
            login:login,
            avatar_url:avatar_url,
            github_id: id
         }})
        }
        
        const token = sign(
            {user:{
                name:user.name,
                avatar_url:user.avatar_url,
                id:user.id
            }
            },
            process.env.JWT,
            {
            subject:user.id,
            expiresIn:'1d'
            }
        )
        return {token,user}
    }
}