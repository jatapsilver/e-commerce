import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth-guard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from "src/roles/roles.enum"
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';


@ApiTags("Users")
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userServices:UsersService){}

    @Get()
    @ApiQuery({name: "page", required: false,})
    @ApiQuery({name: "limit", required: false,})
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    getUsers(@Query("page") page: number = 1, @Query("limit") limit: number = 5, ): any{
        return this.userServices.getUsers(page, limit);
    }
    
    @Get(`:id`,)
    getUser(@Param(`id`, ParseUUIDPipe) id: string){
        return this.userServices.getUser(id);
    }

    @Put(`:id`)
    @ApiBody( {type: CreateUserDto})
    updateUser(@Param(`id`, ParseUUIDPipe) id: string, @Body() user:any){
        return this.userServices.updateUser(id, user);
    }

    @Delete(`:id`)
    deleteUser(@Param(`id`, ParseUUIDPipe) id: string){
        return this.userServices.deleteUser(id);
    }
}
