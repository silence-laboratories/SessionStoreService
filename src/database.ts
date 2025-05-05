// src/database.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Session } from './entity/session';

import * as dotenv from 'dotenv';

dotenv.config(); 

const isSQLite = process.env.DATABASE_TYPE === 'sqlite';

export const AppDataSource = new DataSource(
  isSQLite ? {
    type: 'sqlite',
    database: process.env.DATABASE_NAME || 'test.db',
    synchronize: true,
    logging: false,
    entities: [Session],
  } : {
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    synchronize: true,
    logging: false,
    entities: [Session],
  }
);
