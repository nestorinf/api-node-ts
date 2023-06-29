import { MenuEntity } from "../domain/menu.entity";
import { MenuRepository } from "../domain/menu.repository";
import { MenuValue } from "../domain/menu.value";

export class MenuUseCase {

    constructor(private menuRepository: MenuRepository) {
    }

    async createMenu({name, parentId, status}: {name:string, parentId?: number, status: number}) {
        const menuValue = new MenuValue(name, parentId, status)
        const newMenu = await this.menuRepository.createMenu(menuValue)
        return newMenu
    }

    async createManyMenu(menu: any) {
        const newMenu = await this.menuRepository.createManyMenu(menu)
        return newMenu
    }

    async getMenuById(id: number) {
        const menu = await this.menuRepository.getMenuById(id)
        return menu
    }

    async getMenuByUser(email: string) {
        const menu = await this.menuRepository.getMenuByUser(email)
        return menu
    }

    async getMenuAll() {
        return await this.menuRepository.getMenuAll()
    }
}