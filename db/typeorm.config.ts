import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

const envFilePath = path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`);
config({ path: envFilePath });

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: configService.get('nodenv') === 'development',
  logging: configService.get('nodenv') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: '__migration',
});
