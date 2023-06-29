import { MenuUseCase } from "../../app/menu.use-case";
import { Request, Response } from "express";

export class MenuController {

    constructor(private menuUseCase: MenuUseCase) { }

    getMenuById = async ({ params }: Request, res: Response) => {
        const { id } = params
        const menu = await this.menuUseCase.getMenuById(parseInt(id))
        res.send({ data: menu })
    }


    getMenuByUser = async ({ query }: Request, res: Response) => {
        const { email } = query
        const menu = await this.menuUseCase.getMenuByUser(String(email))

        const newMenu = []
        menu.map(element => {
            newMenu.push(element.menu)
        })
        const menuThree = nodeThree(newMenu, null)

        res.send({ data: menuThree })
    }



    getMenuAll = async (req: Request, res: Response) => {
        try {
            const menus = await this.menuUseCase.getMenuAll()
            const menuThree = nodeThree(menus, null)
            res.send({ data: menuThree })
        } catch (error) {
            console.log(error)
        }
    }

    createMenu = async ({ body }: Request, res: Response) => {
        // if(payload.children != null) {
        //     for (const children in payload.children) {

        //     }
        try {

            const payload = body
            const menu = recursive(payload)
            console.log(menu)
            const newMenu =await this.menuUseCase.createManyMenu(menu)
            console.log(newMenu)

            res.send({ data: false })
        } catch (error) {
            console.log(error.meta)
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
    const menu = []
    const parentMenu = data.filter(({parentId}) => parentId == parent)
    .map(element => ({
        ...element,
        child: nodeThree(data, element.id)
    }))
    return parentMenu
}