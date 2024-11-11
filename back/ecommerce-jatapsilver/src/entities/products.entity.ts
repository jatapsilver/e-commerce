import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories.entity";
import { OrderDetail } from "./order_detail.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({
    name: "products",
})

export class Product {
    @ApiProperty({
        description: "Debe ser un uuid autogenerado por la base de datos",
        example: "28697805-d516-45a7-ae9a-f1e72836feaa"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: "Debe ser una string con maximo 50 caracteres, unico y es obligatorio",
        example: "Iphone 15 Promax"
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;

    @ApiProperty({
        description: "Debe ser una string con maximo 255 caracteres y es obligatorio",
        example: "Iphone 15 Promax es un smartphone de la marca Apple con diseño premium y un diseño elegante."
    })
    @Column({
        type: "text",
        nullable: false,
    })
    description: string;

    @ApiProperty({
        description: "Debe ser un numero decimal con precision de 2 decimales y es obligatorio",
        example: "1299.99"
    })
    @Column({
        type: "decimal",
        default: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @ApiProperty({
        description: "Debe ser un entero y es obligatorio",
        example: 100
    })
    @Column({
        type: "int",
        nullable: false,
    })
    stock: number;

    @ApiProperty({
        description: "Debe ser una string con maximo 100 caracteres",
        example: "https://cdn-icons-png.flaticon.com/512/74/74472.png"
    })
    @Column({
        type: "text",
        default: "https://cdn-icons-png.flaticon.com/512/74/74472.png",
    })
    imgUrl: string;

    @ApiProperty({
        description: "Debe ser una relacion entre la orden de detalle y los productos ",
    })
    @ManyToMany (() => OrderDetail, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetail[];
    
    @ApiProperty({
        description: "Debe ser una relacion entre la categorias y los productos ",
    })
    @ManyToOne (() => Category, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category: Category;

}