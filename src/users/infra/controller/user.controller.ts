import { UserUseCase } from "../../app/user.use-case";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

export class UserController {

    constructor(private userUseCase: UserUseCase) { }

    login = async ({ body }: Request, res: Response) =>{
        const email = body.email
        try {
            const password = body.password
    
            const findUserEmail = await this.userUseCase.getUserByEmail(email)
            const comparePassword = await bcrypt.compare(password, findUserEmail.password)
            if(!comparePassword) {
                res.status(400).send({ message: "invalid credentials" })
               
            }
            const token = jsonwebtoken.sign({
                name: findUserEmail.username,
                id: findUserEmail.id
            }, "theSecretKey")
           
            
            res.send({ token: token })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }

    }

    getUserById = async ({ params }: Request, res: Response) => {
        const { id } = params
        const user = await this.userUseCase.getUserById(parseInt(id))
        res.send({ data: user })
    }

    getUserByEmail = async ({ params }: Request, res: Response) => {
        const { email } = params
        const user = await this.userUseCase.getUserByEmail(email)
        res.send({ data: user })
    }

    getAllUser = async (req: Request, res: Response) => {
        try {
            const users = await this.userUseCase.getUserAll()

            res.send({ data: users })
        } catch (error) {
            console.log(error)
        }
    }

    createUser = async ({ body }: Request, res: Response) => {
 
        try {

            const payload = body
            const saltRound = 10
            const newPassword = await bcrypt.hash(body.password, saltRound)
            payload.password = newPassword
            const newMenu = await this.userUseCase.createUser(payload)
            

            res.send({ data: newMenu })
        } catch (error) {
            console.log(error.meta)
            res.send({
                error: "Error Internal",
                meta: error.meta

            }).status(500)
        }
        // }

    }

    updateUser = async ({ body, params }: Request, res: Response) => {
 
        try {

            const payload = body
          
            payload.id = parseInt(params.id)
            const saltRound = 10
            const newPassword = await bcrypt.hash(body.password, saltRound)
            payload.password = newPassword
            const updateUser = await this.userUseCase.updateUser(payload)
            console.log(updateUser)

            res.send({ data: updateUser })
        } catch (error) {
            console.log(error)
            res.send({
                error: "Error Internal",
                meta: error.meta

            }).status(500)
        }
        // }

    }
    deleteUser = async ({ params }: Request, res: Response) => {
 
        try {

            const id = params.id
            const deleteUser = await this.userUseCase.deleteUser(parseInt(id))
   

            res.send({ data: deleteUser })
        } catch (error) {
            console.log(error)
            res.send({
                error: "Error Internal",
                meta: error.meta

            }).status(500)
        }
        // }

    }


}

const recursive = (data): any => {
    let menu = []
    if (data) {
        for (let i = 0; i < data.length; i++) {
            menu.push({
                name: data[i].name,
                parentId: data[i].parentId,
                status: data[i].status
            })
            const menuRecursive = recursive(data[i].children)
            menuRecursive.map(ele => {
                menu.push(ele)
            })
        }
    }
    return menu
}

const nodeThree = (data:any, parent: number | null) => {
    const parentMenu = data.filter(({parentId}) => parentId == parent)
    .map(element => ({
        ...element,
        child: nodeThree(data, element.id)
    }))
    return parentMenu
}

