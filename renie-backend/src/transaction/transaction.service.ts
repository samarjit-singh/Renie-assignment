import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Transaction } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
        compartment: data.compartment,
        quantity: data.quantity,
        createdAt: data.createdAt,
      },
    });

    const compartment = data.compartment.toLowerCase();
    let pointsIncrease = 0;

    switch (compartment) {
      case 'plastic':
        pointsIncrease = 10;
        break;
      case 'paper':
        pointsIncrease = 5;
        break;
      case 'tetrapak':
        pointsIncrease = 15;
        break;
      case 'cans':
        pointsIncrease = 25;
        break;
      default:
        pointsIncrease = 0;
        break;
    }

    if (pointsIncrease > 0) {
      await this.prisma.user.update({
        where: { id: data.userId },
        data: {
          points: {
            increment: pointsIncrease * data.quantity,
          },
        },
      });
    }

    return createdTransaction;
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    const numericUserId = parseInt(userId, 10);
    return this.prisma.transaction.findMany({
      where: {
        userId: numericUserId,
      },
    });
  }
}
