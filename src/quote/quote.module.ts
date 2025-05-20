import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
