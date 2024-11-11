import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor (private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product) private readonly productsRepository:Repository<Product>
    ){}
        async uploadImage(file:Express.Multer.File, productId: string){
            const product = await this.productsRepository.findOneBy({ id: productId});

            if(!product) throw new NotFoundException(`Product ${productId} not found`)
           
            const uploadedImage = await this.fileUploadRepository.uploadImage(file)
            
            await this.productsRepository.update(productId, { imgUrl: uploadedImage.secure_url})
            
            const findUpdateProduct = await this.productsRepository.findOneBy({id:productId})
            return findUpdateProduct
        }
}
