import { MenuEntity } from "./menu.entity";

export interface MenuRepository {
    getMenuFilter(name?:string): Promise<MenuEntity[]>
    getMenuByUser(email?:string): Promise<MenuEntity[]>
    getMenuById(id:number): Promise<MenuEntity[]>
    getMenuAll(): Promise<MenuEntity[]>
    createMenu(menu: MenuEntity): Promise<MenuEntity>
    createManyMenu(menu: MenuEntity[]): Promise<any>
    updateMenu(menu: MenuEntity): Promise<MenuEntity>
    deleteMenu(id:number):  Promise<MenuEntity | null>
}