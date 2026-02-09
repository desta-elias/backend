import 'dotenv/config';
import { DataSource } from 'typeorm';

const dbType = (process.env.DB_TYPE || 'postgres').toLowerCase();
const defaultPort = dbType === 'mysql' ? '3306' : '5432';

export default new DataSource({
  type: dbType as 'postgres' | 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || defaultPort, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ssl: false,
});
