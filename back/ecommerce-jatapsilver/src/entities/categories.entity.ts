import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./products.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({
    name: "categories"
})

export class Category {
    @ApiProperty({
        description: "Debe ser un uuid autogenerado por la base de datos",
        example: "28697805-d516-45a7-ae9a-f1e72836feaa"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: "Debe ser un string con maximo 50 caracteres y obligatorio",
        example: "smartphone"
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;
    
    @ApiProperty({
        description: "Debe ser una relacion entre la categorias y los productos ",
    })
    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn()
    products: Product[];


}