import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import * as data from "../utils/data.json"


@Injectable()
export class CategoriesRepository{

    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

    async getCategory(){
        return await this.categoriesRepository.find();
    }

    async addCategories() {
        const messages = [];
    
        for (const element of data) {
            const existingCategory = await this.categoriesRepository
                .createQueryBuilder("category")
                .where("category.name = :name", { name: element.category })
                .getOne();
    
            if (existingCategory) {
                messages.push(`La categoría "${element.category}" ya existe.`);
            } else {
                await this.categoriesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Category)
                    .values({ name: element.category })
                    .execute();
    
                messages.push(`La categoría "${element.category}" fue agregada.`);
            }
        }
    

        return messages.join("\n");
    }
    

}