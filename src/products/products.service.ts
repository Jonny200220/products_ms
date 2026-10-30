import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPage = await this.prisma.product.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalPage / Number(limit));
    return {
      data: await this.prisma.product.findMany({
        take: limit,
        skip: (Number(page) - 1) * Number(limit),
        where: { available: true },
      }),
      meta: {
        total: totalPage,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { 
        id,
        available: true,
       },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    if (!id) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // hard delete
  // async remove(id: number) {
  //   await this.findOne(id);
  //   if (!id) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   return this.prisma.product.delete({
  //     where: { id },
  //   });
  // }

  //soft delete
  async softRemove(id: number) {
    await this.findOne(id);
    if (!id) {
      throw new NotFoundException('Product not found');
    };
    const product = await this.prisma.product.update({
      where: { id },
      data: { available: false }
    });

    return `Product ${product.name} removed`;
  }


}