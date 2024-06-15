import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction as TransactionModel } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() transactionData: CreateTransactionDto,
  ): Promise<TransactionModel> {
    return this.transactionsService.createTransaction(transactionData);
  }

  @Get()
  async getTransactions(): Promise<TransactionModel[]> {
    return this.transactionsService.getTransactions();
  }

  @Get('user/:userId')
  async getTransactionsByUserId(
    @Param('userId') userId: string,
  ): Promise<TransactionModel[]> {
    return this.transactionsService.getTransactionsByUserId(userId);
  }
}
