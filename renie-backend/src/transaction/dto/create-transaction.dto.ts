import { IsInt, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  userId: number;

  @IsString()
  compartment: string;

  @IsNumber()
  quantity: number;

  @IsDate()
  createdAt: Date;
}
