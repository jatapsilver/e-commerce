import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth-guard.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';


@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}
        
    
    @Get()
    getCategories(){
        return this.categoriesService.getCategories();
    }
    
    @Post("seeder")
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addCategories(){
        return this.categoriesService.addCategories();
        
    }
    
}
