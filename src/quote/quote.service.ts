import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  create(createQuoteDto: CreateQuoteDto) {
    return this.quoteRepository.save(createQuoteDto);
  }

  findAll() {
    return this.quoteRepository.find();
  }

  findOne(id: string) {
    return this.quoteRepository.findOne({ where: { id } });
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    await this.quoteRepository.update(id, updateQuoteDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.quoteRepository.delete(id);
  }
}
