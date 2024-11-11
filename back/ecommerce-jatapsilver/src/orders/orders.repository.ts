import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderDetail } from "src/entities/order_detail.entity";
import { Order } from "src/entities/orders.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";


@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async addOrder(userId: string, products: any) {
        let total = 0;
    
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new NotFoundException(`usuario con id ${userId} no fue encontrado`);
    
        const order = new Order();
        order.date = new Date();
        order.user = user;
    
        const newOrder = await this.ordersRepository.save(order);
    
        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({ id: element.id });
                if (!product) throw new NotFoundException(`producto con id ${element.id} no fue encontrado`);
                if (product.stock < 1) throw new ConflictException(`El producto con id ${element.id} no tiene suficiente stock`);
    
                total += Number(product.price);
                await this.productsRepository.update(
                    { id: element.id },
                    { stock: product.stock - 1 },
                );
    
                return product;
            })
        );
    
        const orderDetail = new OrderDetail();
        orderDetail.price = Number(total.toFixed(2)); 
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
    
        await this.orderDetailsRepository.save(orderDetail);
    
        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: true,
            },
        });
    }
    

    async getOrder(id: string){
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetails: {
                    products: true,
                },
            }, 
        });

        if (!order) throw new NotFoundException(`orden con identificador: ${id} , no fue encontrado`);
        return order;
    }
       
}