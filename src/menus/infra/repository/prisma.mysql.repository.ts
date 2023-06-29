import { MenuEntity } from "../../domain/menu.entity";
import { MenuRepository } from "../../domain/menu.repository";
import { PrismaClient, Prisma } from "../../../shared/database/mysql/prisma/client"

export class PrismaMysqlRepository implements MenuRepository {
    async getMenuByUser(email?: string): Promise<any> {
       
        return await this.client.menuToUser.findMany({
            where: {
                user: {
                    email: email
                }
            },
            include: {
                menu: true
            }
        })
    }
    private readonly client: PrismaClient = new PrismaClient()


    async createManyMenu(menu: MenuEntity[]): Promise<any> {
        const newMenu = await this.client.menu.createMany({
            data: menu
        })
        return newMenu
    }

    getMenuFilter(name?: string): Promise<MenuEntity[]> {
        throw new Error("Method not implemented.");
    }
    async getMenuById(id: number): Promise<any> {
        return await this.client.menu.findUnique({ where: { id: id } })
    }
    async createMenu(menu: any): Promise<any> {

        const payload: Prisma.MenuCreateArgs = {
            data: menu
        }

        const newMenu = await this.client.menu.create(payload)
        return newMenu;

    }
    async getMenuAll(): Promise<MenuEntity[]> {
        return await this.client.menu.findMany({
            where: {status: 1},
            orderBy: [{ parentId: 'desc' }],
          })
    }
    async updateMenu(menu: MenuEntity): Promise<MenuEntity> {
        const payload: Prisma.MenuUpdateArgs = {
            where: {
                id: menu.id
            },
            data: menu
        }

        const newMenu = await this.client.menu.update(payload)
        return newMenu;
    }
    async deleteMenu(id: number): Promise<MenuEntity> {
        return await this.client.menu.update({ where: { id: id }, data: { status: 0 } })
    }

}