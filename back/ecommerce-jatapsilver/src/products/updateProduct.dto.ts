import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class UpdateProductDto {

    @ApiProperty({
        description: "Debe ser una string con maximo 50 caracteres,",
        example: "Xiaomi 13T Pro"
    })@IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Debe ser una string con maximo 255 caracteres ",
        example: "Xiamomi 13T Pro es un smartphone de la marca Xiaomi con diseño premium y un diseño elegante."
    })
    description: string;


    @ApiProperty({
        description: "Debe ser un numero decimal con precision de 2 decimales",
        example: "1299.99"
    })
    price: number

    @ApiProperty({
        description: "Debe ser un entero",
        example: 20
    })
    stock: number;

}