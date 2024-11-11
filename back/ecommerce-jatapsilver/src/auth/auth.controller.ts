import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("AuthService")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    
    @Post(`signup`)
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user);
    }

    @Post(`signIn`)
    signIn(@Body() credential: LoginUserDto){
        const { email, password } = credential
        return this.authService.signIn(email, password);
    }

    @Put("/admin/:id")
    updateAdminUser(@Param(`id`, ParseUUIDPipe) id: string){
        return this.authService.UpdateAdminUser(id)
    }

}
  