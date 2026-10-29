import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { url } from "inspector";

@Injectable()
export class PrismaService extends PrismaClient {

  private logger = new Logger('PrismaService');
  
  constructor() {
    const adapter = new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL as string,
    });
    super({ adapter });
    this.logger.log('Database connection established');
  }
}