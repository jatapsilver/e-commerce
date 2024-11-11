import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength, Validate, } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class CreateUserDto {
   
    @ApiProperty({
        description: "Debe de Ser un String de entre 3 y 8 Caracteres",
        example: "TestUser"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({
        description: "Debe de ser un String y un email valido",
        example: "testuser@example.com"
    }) 
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: "Debe de Ser un String entre 8 y 15 caracteres con al menos una mayusculoa, una minuscula, un numero y un caracter especia",
        example: "Test1234*"
    }) 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/, {
        message: "la contraseña debe contener al menos una letra minuscula, una letra mayuscula, un numero y un caracter especial",
    })
    @MinLength(8)
    @MaxLength(15)
    password: string;
    
    @ApiProperty({
        description: "Debe de Ser un String entre 8 y 15 caracteres con al menos una mayusculoa, una minuscula, un numero y un caracter especia",
        example: "Test1234*"
    }) 
    @IsNotEmpty()
    @Validate(MatchPassword, ["password"])
    confirmPassword: string;

   
    @ApiProperty({
        description: "Debe de Ser un Number",
        example: "123456789"
    }) 
    @IsNotEmpty()
    @IsNumber()
    phone: number;
    
   
    @ApiProperty({
        description: "Debe de Ser un Strign de entre 4 y 20 caracteres",
        example: "Colombia"
    }) 
    @IsString()
    @IsNotEmpty()
    @MinLength(4) 
    @MaxLength(20)
    country?: string;


   
    @ApiHideProperty() 
    @IsEmpty()
    isAdmin?: boolean;
    

    @ApiProperty({
        description: "Debe de Ser un String de entre 3 y 80 caractere",
        example: "Calle Test 123"
    }) 
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    address?: string;
    

    @IsNumber()
    @IsNotEmpty()
    ndni?: number;


    @ApiProperty({
        description: "Debe de Ser un String de entre 4 y 20 caracteres",
        example: "Bogota"
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    city?: string;

}

export class LoginUserDto extends PickType(CreateUserDto, ["email", "password",]){}
