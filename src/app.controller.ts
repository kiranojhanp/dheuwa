import { Controller, Get } from '@nestjs/common';
import { AppService, RootResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): RootResponse {
    return this.appService.getHello();
  }

  @Get('/foo')
  getBar(): string {
    return 'bar';
  }
}
