import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

     async getUsers(page: number, limit: number){
        const skip = (page - 1) * limit;
        const users  = await this.userRepository.find({
            take: limit,
            skip: skip,
        });
        return users.map(({ password, ...userNopassword }) => userNopassword);
    }

    async getUser(id:string){
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                orders: true,
            },
        });
        if (!user) return `No se ecneontro al usuario con ${id}`;
        const  { password, isAdmin, ...userNoPassword} = user;
        return userNoPassword;
    }

    async createUser(user:Partial<User>): Promise<Partial<User>>{
        const newUser = await this.userRepository.save(user);
        const dbUser = await this.userRepository.findOneBy({ id: newUser.id });
        const { password,isAdmin, ...userNoPassword} = dbUser;
        return userNoPassword;
    }

    async updateUser(id:string, user:User): Promise<Partial<User>>{
        await this.userRepository.update(id, user);
        const updateUser = await this.userRepository.findOneBy({id});
        const { password, ...userNoPassword} = updateUser
        return userNoPassword;
    }

    async deleteUser(id:string): Promise<Partial<User>>{
        const user = await this.userRepository.findOneBy({id});
        this.userRepository.remove(user);
        const { password,...userNoPassword} = user;
        return userNoPassword;
    }

    async getUserByEmail(email:string){
       return await this.userRepository.findOneBy({email})
    }
}