import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth-guard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './updateProduct.dto';


@ApiTags("Products")
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    @ApiQuery({name: "page", required: false,})
    @ApiQuery({name: "limit", required: false,})
    getProducts(@Query(`page`) page: number = 1, @Query(`limit`) limit:number=5,): any {
        return this.productsService.getProducts(page, limit);
    }

    
    @Get(':id')
    getProduct(@Param(`id`, ParseUUIDPipe) id: string){
        return this.productsService.getProduct(id);
    }
    
    
    @Put(':id')
    @ApiBearerAuth()
    @ApiBody( {type: UpdateProductDto})
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Param(`id`, ParseUUIDPipe) id: string, @Body() product: any) {
        return this.productsService.updateProduct(id, product);
    }
    
    @Post("seeder")
    addProducts(){
        return this.productsService.addProducts();
    }
    // @Delete(':id')
    // deleteProduct(@Param(`id`) id: string) {
    //     return this.productsService.deleteProduct(id);
    // }

    

}
