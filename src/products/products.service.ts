import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma.service.js';
import { PaginationDto } from '../common/index.js';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {

    console.log({ createProductDto });
    const product = await this.prisma.product.create({
      data: createProductDto,
    })
    return product;
  }

  findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto; 

    return this.prisma.product.findMany({
      take: limit,
      skip: (Number(page) - 1) * Number(limit),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
