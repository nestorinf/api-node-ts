export interface UserEntity {
    id?:number;
    username?:string;
    name:string;
    lastname:string;
    email?: string;
    password: string
    status:number;
}