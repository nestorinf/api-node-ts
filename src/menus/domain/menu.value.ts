import { MenuEntity } from "./menu.entity";

export class MenuValue  implements MenuEntity {
    name: string;
    parentId?: number;
    status: number;
    
    constructor(name: string, parentId: number, status: number) {
        this.name = name
        this.parentId = parentId ?? null
        this.status = status ?? 1
    }
}