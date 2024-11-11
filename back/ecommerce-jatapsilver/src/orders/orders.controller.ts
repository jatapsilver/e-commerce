import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { AuthGuard } from 'src/auth/auth-guard.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Ordes")
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}
    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    getOrder(@Param('id', ParseUUIDPipe) id: string){
        return this.ordersService.getOrder(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    addOrder(@Body() order: CreateOrderDto){
        const { userId, products} = order;
        return this.ordersService.addOrder(userId, products);
    }

}
