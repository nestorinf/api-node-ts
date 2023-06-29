
import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { UserValue } from "../domain/user.value";

export class UserUseCase {

    constructor(private userRepository: UserRepository) {
    }
   
    async createUser({username, name,lastname,email,password ,status}: {username:string, name:string, lastname:string, email:string, password: string, status: number}) {
        const userValue = new UserValue(null,username, name, lastname, email, password, status)
        const newUser = await this.userRepository.createUser(userValue)
        return newUser
    }

    async updateUser({id, username, name,lastname,email,password ,status}: {id: number,username:string, name:string, lastname:string, email:string, password: string, status: number}) {
        const userValue = new UserValue(id,username, name, lastname, email, password, status)
        const newUser = await this.userRepository.updateUser(userValue)
        return newUser
    }

    async deleteUser(id: number) {
        const deleteUser = await this.userRepository.deleteUser(id)
        return deleteUser
    }

    async getUserByEmail(email: string) {
        const User = await this.userRepository.getUserByEmail(email)
        return User
    }

    async getUserById(id: number) {
        const User = await this.userRepository.getUserById(id)
        return User
    }

    async getUserAll() {
        return await this.userRepository.getUserAll()
    }

    async login(email: string, password: string) {
        return await this.userRepository.login(email, password)
    }
}