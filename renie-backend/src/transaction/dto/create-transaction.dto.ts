import { IsInt, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  userId: string;

  @IsString()
  compartment: string;

  @IsNumber()
  quantity: number;

  @IsDate()
  createdAt: Date;
}
