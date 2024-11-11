import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";
import { OrderDetail } from "./order_detail.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


@Entity({
    name: "orders",
})

export class Order {
    @ApiProperty({
        description: "Debe ser un uuid autogenerado por la base de datos",
        example: "28697805-d516-45a7-ae9a-f1e72836feaa"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: "Debe ser una fecha de tipo  dd/mm/yyyy",
        example: "01/09/2024"
    })
    @Column()
    date: Date;

    
    @ApiProperty({
        description: "Debe ser una relacion entre las ordenes y el usuario que les pertenecen",
    })
    @ManyToOne(() => User, (users) => users.orders)
    @JoinColumn({ name: "user_id" })
    user: User;
    
    @ApiProperty({
        description: "Debe ser una relacion entre la orden y el detalle de la orden ",
    })
    @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetail;
}