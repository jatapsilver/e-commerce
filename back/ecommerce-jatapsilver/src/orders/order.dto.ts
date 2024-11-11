import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Product } from "src/entities/products.entity";

export class CreateOrderDto {

    @ApiProperty({
        description: "Debe de Ser el uuid del usuario que esta creando la orden",
        example: "28697805-d516-45a7-ae9a-f1e72836feaa"
    }) 
    @IsUUID()
    @IsNotEmpty()
    userId: string;
    
    @ApiProperty({
        description: "Debe ser la lista de prodcucto que forman la orden, debe contener al menos un producto",
        example: `[{"id":"6503ce2c-def9-481e-a649-e8230744a758"},{"id":"a28df935-75e0-4b7f-8a91-b71ab792f437"}]`
    }) 
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>;

}