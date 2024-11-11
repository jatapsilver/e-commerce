import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/auth/auth-guard.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags("FileUpload")
@Controller('files')
export class FileUploadController {
    constructor (private readonly fileUploadService: FileUploadService){}
    @Post("/uploadImage/:id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("file"))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary', 
            },
          },
        },
      })
    uploadImage(@Param("id") productId:string, 
                @UploadedFile( new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 200000,
                message: "El archivo no puede ser mayor a 2MB."
            }),
            new FileTypeValidator({
                fileType: /jpg|jpeg|png|gif|webp|svg/,
            })
        ]
    })) file:Express.Multer.File,
    ){
        return this.fileUploadService.uploadImage(file, productId);
    }
}
