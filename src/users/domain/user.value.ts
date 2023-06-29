import { UserEntity } from "./user.entity";

export class UserValue  implements UserEntity {
    id?: number;
    username:string;
    name:string;
    lastname:string;
    email: string;
    password: string
    status:number;
    
    constructor(id: number | null,username: string, name: string, lastname: string, email: string, password: string, status: number) {
        this.id = id ?? null
        this.username = username
        this.name = name
        this.lastname = lastname
        this.email = email
        this.password = password
        this.status = status ?? 1
    }
}