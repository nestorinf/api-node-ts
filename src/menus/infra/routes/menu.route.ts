import { Router } from "express";
import { PrismaMysqlRepository } from "../repository/prisma.mysql.repository";
import { MenuUseCase } from "../../app/menu.use-case";
import { MenuController } from "../controller/menu.controller";

const menuRoutes = Router()


const menuRepository = new PrismaMysqlRepository()
const menuUseCase = new MenuUseCase(menuRepository)

const menuController = new MenuController(menuUseCase)


menuRoutes.get('/menus/all', menuController.getMenuAll)
menuRoutes.get('/menus/user', menuController.getMenuByUser)
menuRoutes.get('/menus/:id', menuController.getMenuById)
menuRoutes.post('/menus/add', menuController.createMenu)
// menuRoutes.

export default menuRoutes