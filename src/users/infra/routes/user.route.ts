import { Router } from "express";
import { PrismaMysqlRepository } from "../repository/prisma.mysql.repository"
import { UserUseCase } from "../../app/user.use-case";
import { UserController } from "../controller/user.controller";

const routes = Router()


const repository = new PrismaMysqlRepository()
const useCase = new UserUseCase(repository)
const controller = new UserController(useCase)



routes.get('/users/all', controller.getAllUser)
routes.post('/login', controller.login)
routes.get('/users/:id', controller.getUserById)
routes.get('/users/:email', controller.getUserByEmail)
routes.post('/users/add', controller.createUser)
routes.put('/users/update/:id', controller.updateUser)
routes.delete('/users/delete/:id', controller.deleteUser)
export default routes