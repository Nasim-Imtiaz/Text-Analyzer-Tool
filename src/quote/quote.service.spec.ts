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

  // unit test for create quote
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

  // unit test for read quotes
  it('should return all quotes', async () => {
    quoteRepository.find.mockResolvedValue([quote]);
    const result = await service.findAll();
    expect(result).toEqual([quote]);
    expect(quoteRepository.find).toHaveBeenCalled();
  });

  // unit test for read quote
  it('should return one quote by id', async () => {
    quoteRepository.findOne.mockResolvedValue(quote);
    const result = await service.findOne('ABCD1234EFGH0987');
    expect(result).toEqual(quote);
    expect(quoteRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'ABCD1234EFGH0987' },
    });
  });

  // unit test for update quote
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

  // unit test for delete quote
  it('should delete a quote', async () => {
    quoteRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
    const result = await service.remove('ABCD1234EFGH0987');
    expect(result).toEqual({ affected: 1, raw: [] });
    expect(quoteRepository.delete).toHaveBeenCalledWith('ABCD1234EFGH0987');
  });

  // unit tests for cleaning function
  it('cleanText should remove punctuation and lowercase', () => {
    expect(service.cleanText('Hello, World!')).toBe('hello world');

    expect(service.cleanText(`It's TuesDay?`)).toBe('its tuesday');

    expect(
      service.cleanText(
        'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
      ),
    ).toBe(
      'the quick brown fox jumps over the lazy dog the lazy dog slept in the sun',
    );
  });

  // unit tests for get words
  it('getWords should split by whitespace', () => {
    expect(service.getWords('hello world test')).toEqual([
      'hello',
      'world',
      'test',
    ]);

    expect(service.getWords('this is  captain from \n\n flight 2490')).toEqual([
      'this',
      'is',
      'captain',
      'from',
      'flight',
      '2490',
    ]);

    expect(
      service.getWords(
        'the quick brown fox jumps over the lazy dog the lazy dog slept in the sun',
      ),
    ).toEqual([
      'the',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'the',
      'lazy',
      'dog',
      'the',
      'lazy',
      'dog',
      'slept',
      'in',
      'the',
      'sun',
    ]);
  });

  // unit tests for character count
  it('getCharacterCount should exclude whitespace', () => {
    expect(service.getCharacterCount('hello world')).toBe(10);

    expect(
      service.getCharacterCount(
        'the quick brown fox jumps over the lazy dog the lazy dog slept in the sun',
      ),
    ).toBe(58);
  });

  // unit tests for sentence count
  it('getSentenceCount should count sentence', () => {
    expect(service.getSentenceCount('Hi. Hello! Okay?')).toBe(3);

    expect(
      service.getSentenceCount(
        'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
      ),
    ).toBe(2);
  });

  // Unit tests for paragraph count
  it('getParagraphCount should split on line breaks', () => {
    expect(
      service.getParagraphCount('First paragraph.\n\nSecond one.\nThird.'),
    ).toBe(3);

    expect(
      service.getParagraphCount(
        'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
      ),
    ).toBe(1);

    expect(
      service.getParagraphCount(
        'The quick brown fox jumps over the lazy dog. \n\n The lazy dog slept in the sun.',
      ),
    ).toBe(2);
  });

  // unit tests for longest words
  it('getLongestWord should return the longest', () => {
    expect(service.getLongestWord(['a', 'quick', 'brown', 'fox'])).toEqual([
      'quick',
      'brown',
    ]);

    expect(
      service.getLongestWord([
        'the',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'the',
        'lazy',
        'dog',
        'the',
        'lazy',
        'dog',
        'slept',
        'in',
        'the',
        'sun',
      ]),
    ).toEqual(['quick', 'brown', 'jumps', 'slept']);
  });

  // integration tests for the analyzeQuote
  it('should return zeros for empty string', () => {
    const result = service.analyzeQuote('');

    expect(result.wordCount).toBe(0);
    expect(result.charCount).toBe(0);
    expect(result.sentenceCount).toBe(0);
    expect(result.paragraphCount).toBe(0);
    expect(result.longestWord).toEqual([]);
  });

  it('should analyze a typical paragraph', () => {
    const text =
      'This is a simple sentence. This is another one!\n\nNew paragraph here.';

    const result = service.analyzeQuote(text);

    expect(result.wordCount).toBe(12);
    expect(result.charCount).toBe(53);
    expect(result.sentenceCount).toBe(3);
    expect(result.paragraphCount).toBe(2);
    expect(result.longestWord).toEqual(['paragraph']);
  });

  it('should analyze the gives test case', () => {
    const text =
      'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.';

    const result = service.analyzeQuote(text);

    expect(result.wordCount).toBe(16);
    expect(result.charCount).toBe(58);
    expect(result.sentenceCount).toBe(2);
    expect(result.paragraphCount).toBe(1);
    expect(result.longestWord).toEqual(['quick', 'brown', 'jumps', 'slept']);
  });
});
