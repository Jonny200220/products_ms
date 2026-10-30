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

    const totalPage = await this.prisma.product.count();
    const lastPage = Math.ceil(totalPage / Number(limit));


    return {
      data: await this.prisma.product.findMany({
        take: limit,
        skip: (Number(page) - 1) * Number(limit),
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
      where: {id},
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
