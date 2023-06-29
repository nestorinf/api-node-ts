import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import {PrismaClient , Prisma} from "../../../shared/database/mysql/prisma/client"

export class PrismaMysqlRepository implements UserRepository {
    private readonly client: PrismaClient = new PrismaClient()


    async login(email: string, password: any): Promise<UserEntity> {
        return await this.client.user.findUnique({where : {email: email}})
    }
    async getUserAll(): Promise<UserEntity[]> {
        return await this.client.user.findMany({where:{status:1}})
    }


    async createUser(user: UserEntity): Promise<UserEntity> {
        console.log("repo: ", user)
        const newMenu = await this.client.user.create({
            data: {
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            }
        })
        return newMenu
    }
   
    async getUserByEmail(email: string): Promise<UserEntity> {
        return await this.client.user.findUnique({where : {email: email}})
    }
    async getUserById(id: number): Promise<any> {
        return await this.client.user.findUnique({where : {id: id}})
    }
 
    async updateUser(user: UserEntity): Promise<UserEntity> {
        return await this.client.user.update({
            where: {
                id: user.id
            },
            data: {
                username: user.username,
                name: user.name,
                lastname: user.lastname,
            
                password: user.password,
                
            }
        })
    }
    async deleteUser(id: number): Promise<any> {
        return await this.client.user.update({where:{id:id}, data:{status:0}})
    }
    
}