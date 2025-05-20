import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';

const mockRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('QuoteController', () => {
  let controller: QuoteController;
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        QuoteService,
        {
          provide: getRepositoryToken(Quote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
