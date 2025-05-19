import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { Quote } from './entities/quote.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('QuoteService', () => {
  let service: QuoteService;
  let quoteRepository: jest.Mocked<Repository<Quote>>;

  const quote: Quote = {
    id: 'ABCD1234EFGH0987',
    author: 'William Shakespeare',
    quote: 'To be, or not to be: that is the question.',
  };

  beforeEach(async () => {
    const mockRepo = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: getRepositoryToken(Quote),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    quoteRepository = module.get(getRepositoryToken(Quote));
  });

  it('should create a quote', async () => {
    quoteRepository.save.mockResolvedValue(quote);
    const result = await service.create({
      author: 'William Shakespeare',
      quote: 'To be, or not to be: that is the question.',
    });
    expect(result).toEqual(quote);
    expect(quoteRepository.save).toHaveBeenCalledWith({
      author: 'William Shakespeare',
      quote: 'To be, or not to be: that is the question.',
    });
  });

  it('should return all quotes', async () => {
    quoteRepository.find.mockResolvedValue([quote]);
    const result = await service.findAll();
    expect(result).toEqual([quote]);
    expect(quoteRepository.find).toHaveBeenCalled();
  });

  it('should return one quote by id', async () => {
    quoteRepository.findOne.mockResolvedValue(quote);
    const result = await service.findOne('ABCD1234EFGH0987');
    expect(result).toEqual(quote);
    expect(quoteRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'ABCD1234EFGH0987' },
    });
  });

  it('should update a quote', async () => {
    const updatedQuote = { ...quote, author: 'William' };

    quoteRepository.update.mockResolvedValue({
      affected: 1,
      raw: [],
      generatedMaps: [],
    });
    quoteRepository.findOne.mockResolvedValue(updatedQuote);

    const result = await service.update('ABCD1234EFGH0987', {
      author: 'William',
    });

    expect(quoteRepository.update).toHaveBeenCalledWith('ABCD1234EFGH0987', {
      author: 'William',
    });
    expect(result).toEqual(updatedQuote);
  });

  it('should delete a quote', async () => {
    quoteRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
    const result = await service.remove('ABCD1234EFGH0987');
    expect(result).toEqual({ affected: 1, raw: [] });
    expect(quoteRepository.delete).toHaveBeenCalledWith('ABCD1234EFGH0987');
  });
});
