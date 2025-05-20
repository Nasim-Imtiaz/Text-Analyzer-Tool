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

  analyzeQuote(text: string) {
    const cleanedText = this.cleanText(text);

    const words = this.getWords(cleanedText);
    const wordCount = words.length;

    return {
      wordCount,
      charCount: this.getCharacterCount(cleanedText),
      sentenceCount: this.getSentenceCount(text),
      paragraphCount: this.getParagraphCount(text),
      longestWord: this.getLongestWord(words),
    };
  }

  // removes special characters
  // makes lowercase
  public cleanText(text: string): string {
    return text.replace(/[^\w\s]/gi, '').toLowerCase();
  }

  // word count based on whitespace character
  public getWords(text: string): string[] {
    return text.trim().split(/\s+/).filter(Boolean);
  }

  // replace any whitespace character
  public getCharacterCount(text: string): number {
    return text.replace(/\s+/g, '').length;
  }

  // end with ( . | ? | ! ) considered as sentence
  public getSentenceCount(text: string): number {
    return (text.match(/[.!?]/g) || []).length;
  }

  // paragraph count based on new line character
  public getParagraphCount(text: string): number {
    return text.split(/\n+/).filter((p) => p.trim() !== '').length;
  }

  // find the maximum word length
  public getLongestWord(words: string[]): string[] {
    const maxLength = Math.max(...words.map((word) => word.length));
    return words.filter((word) => word.length === maxLength);
  }
}
