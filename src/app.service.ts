import { Injectable } from '@nestjs/common';

export interface RootResponse {
  name: string;
  version: string;
}

@Injectable()
export class AppService {
  getHello(): RootResponse {
    return {
      name: 'Dheuwa API',
      version: '0.1.0',
    };
  }
}
