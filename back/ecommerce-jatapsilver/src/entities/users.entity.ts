import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity"
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


@Entity({
    name: "users",
})

export class User {

    @ApiProperty({
        description: "Debe ser un uuid autogenerado por la base de datos",
        example: "28697805-d516-45a7-ae9a-f1e72836feaa"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: "Debe ser una string con maximo 50 caracteres y es obligatorio",
        example: "Test user"
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
    })
    name: string;

    @ApiProperty({
        description: "Debe ser una string con maximo 50 caracteres no estar registrado y es obligatorio",
        example: "Test@example.com"
    })
    @Column({
        type: "varchar",
        length: 50,
        unique: true,
        nullable: false,
    })
    email: string;

    @ApiProperty({
        description: "Debe ser un string encriptado por medio bcrypt y no tendra una longitud mayor a 128 caracteres ",
        example: "$2b$10$El2YP1U2T/d0gM8JrO4D4OFp4CsUYMF/X3CMhaa97iDKEl/8pYuIy*"
    }) 
    @Column({
        type: "varchar",
        length: 128,
        nullable: false,
    })
    password: string;
    
    
    @ApiProperty({
        description: "Debe de Ser un Number tipo entero",
        example: "123456789"
    }) 
    @Column({
        type: "int",
    })
    phone: number;
    
    @ApiProperty({
        description: "Debe de Ser un Strign con una longitud no mayor a 50 caracteres ",
        example: "Colombia"
    }) 
    @Column({
        type: "varchar",
        length: 50,
    })
    country: string;


    @ApiProperty({
        description: "Debe de Ser un Booleano que por default sera false",
        example: "false"
    })
    @Column({
        type: "boolean",
        default: false,
    })
    isAdmin: boolean;


    @ApiProperty({
        description: "Debe de Ser un String con una longitud no mayor a 100 caracteres",
        example: "Calle Test 123"
    }) 
    @Column({
        type: "text",
    })
    address: string;
    

    @ApiProperty({
        description: "Debe de Ser un String con una longitud no mayor a 20 caracteres",
        example: "1234567890"
    })
    @Column({
        type: "int",
    })
    ndni: number;



    @ApiProperty({
        description: "Debe de Ser un String con una longitud no mayor a 50 caracteres",
        example: "Bogotá"
    })
    @Column({
        type: "varchar",
        length: 50,
    })
    city: string;

    @ApiProperty({
        description: "Debe de Ser una lista de ordenes asociadas al usuario",
    }) 
    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({ name: "order_id" })
    orders: Order[];


}

