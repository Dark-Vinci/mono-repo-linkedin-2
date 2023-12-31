import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../server/app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      return expect(appController.ping({ requestId: 'abc' })).toBe({
        requestId: 'Hello World!',
      });
    });
  });
});
