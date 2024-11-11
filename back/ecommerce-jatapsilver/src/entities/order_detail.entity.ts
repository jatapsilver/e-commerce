import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./products.entity";
import { Order } from "./orders.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({
    name: "orderdetails",
})

export class OrderDetail {
    @ApiProperty({
        description: "Debe ser un uuid autogenerado por la base de datos",
        example: "28697805-d516-45a7-ae9a-f1e72836feaa"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: "Debe ser un número decimal con hasta 10 dígitos en total, de los cuales 2 pueden ser decimales",
        example: 1999.99
    })
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
    })
    price: number;

    
    @ApiProperty({
        description: "Debe ser una relacion entre la orden de detalle y los productos ",
    })
    @ManyToMany(() => Product)
    @JoinTable({
        name: "orderdetails_products",
        joinColumn: { 
            name: "product_id",
            referencedColumnName: "id", 
        },
        inverseJoinColumn: {
            name: "orderdetail_id",
            referencedColumnName: "id",
        }
    })
    products: Product[];
    
    @ApiProperty({
        description: "Debe ser una relacion entre la orden y el detalle de la orden ",
    })
    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({ name: "order_id" })
    order: Order;
}