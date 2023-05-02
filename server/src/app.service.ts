import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

export interface CountResult {
  count: number;
}

@Injectable()
export class AppService {
  DB_URL = '';

  constructor(private configService: ConfigService) {
    this.DB_URL = this.configService.get<string>('DATABASE_URL');
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getCount(): Promise<CountResult> {
    const client = new Client(this.DB_URL);
    try {
      await client.connect();
      const results = await client.query(
        'select num from defaultdb.count_test',
      );
      const count = parseInt(results.rows[0].num);
      return { count };
    } catch (error) {
    } finally {
      client.end();
    }
    return { count: 0 };
  }

  async addCountByOne(): Promise<void> {
    const client = new Client(this.DB_URL);
    try {
      await client.connect();
      await client.query('update count_test set num = num+1 where id = 1;');
    } catch (error) {
    } finally {
      client.end();
    }
  }

  async substractCountByOne(): Promise<void> {
    const client = new Client(this.DB_URL);
    try {
      await client.connect();
      await client.query('update count_test set num = num-1 where id = 1;');
    } catch (error) {
    } finally {
      client.end();
    }
  }
}
