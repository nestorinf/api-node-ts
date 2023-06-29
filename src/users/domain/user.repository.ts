import { UserEntity } from "./user.entity";

export interface UserRepository {

    getUserById(id:number): Promise<UserEntity>
    getUserByEmail(email: string): Promise<UserEntity>
    getUserAll(): Promise<UserEntity[]>
    createUser(user: UserEntity): Promise<UserEntity>
    updateUser(user: UserEntity): Promise<UserEntity>
    deleteUser(id:number):  Promise<null>
    login(email: string, password) : Promise<any>
}