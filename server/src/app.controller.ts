import { Controller, Get, Post } from '@nestjs/common';
import { AppService, CountResult } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('count')
  async getCount(): Promise<CountResult> {
    const count = await this.appService.getCount();
    return count;
  }

  @Post('add-count')
  async addCountByOne(): Promise<void> {
    await this.appService.addCountByOne();
  }

  @Post('substract-count')
  async substractCountByOne(): Promise<void> {
    await this.appService.substractCountByOne();
  }
}
