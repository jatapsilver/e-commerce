import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepositoryAdmin: Repository<User>,
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,

    ) {}
   
    
    async signUp(user:Partial<User>){
        const { email, password } = user 
        if(!email || !password) throw new BadRequestException ("Required email and password")
        const foundUser = await this.userRepository.getUserByEmail(email);
        if(foundUser) throw new BadRequestException("Registered email")
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.createUser({...user, password: hashedPassword,})
    }

    async signIn(email:string, password:string): Promise<any>{
        if(!email || !password) return `email and password are required`;
        const user = await this.userRepository.getUserByEmail(email);
        if(!user) throw new BadRequestException("Invalid Credential")
        const validPassword =await bcrypt.compare(password, user.password)
        if(!validPassword) throw new BadRequestException("Invalid Credential");
        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        const token = this.jwtService.sign(payload);
        return {
            message: "Logged in User",
            token, 
        };
    }

    async UpdateAdminUser(id:string): Promise<Partial<User>>{
        const user = await this.userRepositoryAdmin.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        user.isAdmin = true;

        await this.userRepositoryAdmin.save(user); 

        const  { password, ...userNoPassword} = user;
        return userNoPassword;
    }
}
