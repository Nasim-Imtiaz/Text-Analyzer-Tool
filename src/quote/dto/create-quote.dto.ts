import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsNotEmpty()
  quote: string;
}
