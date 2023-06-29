export interface MenuEntity {
    id?:number;
    name:string;
    parentId?:number;
    status:number;
    menu?: MenuEntity
 
}