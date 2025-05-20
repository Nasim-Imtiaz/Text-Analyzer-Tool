import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  Redirect,
  Patch,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('create')
  @Render('quotes/create')
  createForm() {
    return { title: 'Create Quote' };
  }

  @Post()
  @Redirect('/quotes')
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.create(createQuoteDto);
  }

  @Get()
  @Render('quotes/index')
  async findAll() {
    const quotes = await this.quoteService.findAll();
    return { title: 'All Quotes', quotes };
  }

  @Get(':id')
  @Render('quotes/edit')
  async findOne(@Param('id') id: string) {
    const quote = await this.quoteService.findOne(id);
    return { title: 'Update Quote', quote };
  }

  @Patch(':id')
  @Redirect('/quotes')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  @Redirect('/quotes')
  remove(@Param('id') id: string) {
    return this.quoteService.remove(id);
  }

  @Get('word-count/:id')
  async getWordCount(@Param('id') id: string) {
    const data = await this.quoteService.findOne(id);

    if (!data) {
      return;
    }

    const cleaned = this.quoteService.cleanText(data.quote);
    const words = this.quoteService.getWords(cleaned);
    return { wordCount: words.length };
  }

  @Get('character-count/:id')
  async getCharacterCount(@Param('id') id: string) {
    const data = await this.quoteService.findOne(id);

    if (!data) {
      return;
    }

    const cleaned = this.quoteService.cleanText(data.quote);
    const charCount = this.quoteService.getCharacterCount(cleaned);
    return { charCount };
  }

  @Get('sentence-count/:id')
  async getSentenceCount(@Param('id') id: string) {
    const data = await this.quoteService.findOne(id);

    if (!data) {
      return;
    }
    const sentenceCount = this.quoteService.getSentenceCount(data.quote);
    return { sentenceCount };
  }

  @Get('paragraph-count/:id')
  async getParagraphCount(@Param('id') id: string) {
    const data = await this.quoteService.findOne(id);

    if (!data) {
      return;
    }

    const paragraphCount = this.quoteService.getParagraphCount(data.quote);
    return { paragraphCount };
  }

  @Get('longest-word/:id')
  async getLongestWord(@Param('id') id: string) {
    const data = await this.quoteService.findOne(id);

    if (!data) {
      return;
    }

    const cleaned = this.quoteService.cleanText(data.quote);
    const words = this.quoteService.getWords(cleaned);
    const longestWord = this.quoteService.getLongestWord(words);
    return { longestWord };
  }

  @Get('/analyze/:id')
  async analyzeQuote(@Param('id') id: string) {
    const data = await this.quoteService.findOne(id);

    if (!data) {
      return;
    }

    return this.quoteService.analyzeQuote(data.quote);
  }
}
