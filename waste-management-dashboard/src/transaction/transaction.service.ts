import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Transaction } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
        compartment: data.compartment,
        quantity: data.quantity,
        createdAt: data.createdAt,
      },
    });
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }
}
