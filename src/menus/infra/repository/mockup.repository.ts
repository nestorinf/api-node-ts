import { MenuEntity } from "../../domain/menu.entity";
import { MenuRepository } from "../../domain/menu.repository";


export class MockMenuRepository implements MenuRepository {
    createManyMenu(menu: MenuEntity[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getMenuAll(): Promise<MenuEntity[]> {
        throw new Error("Method not implemented.");
    }
    getMenuFilter(name?: string): Promise<MenuEntity[]> {
        throw new Error("Method not implemented.");
    }
    async getMenuById(id: number): Promise<any> {
        const data =  [{
            name: "Inicio",
            parentId: 0,
            status: 1
        }]
       
        return data 
    }
    async createMenu(menu: MenuEntity): Promise<any> {
        const newMenu = Object.assign(menu)
        return newMenu;
        
    }
    updateMenu(menu: MenuEntity): Promise<MenuEntity> {
        throw new Error("Method not implemented.");
    }
    deleteMenu(id: number): Promise<MenuEntity> {
        throw new Error("Method not implemented.");
    }
    
}