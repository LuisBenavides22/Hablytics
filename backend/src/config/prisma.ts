// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is missing in .env file');
}

// 1. Initialize a PostgreSQL connection pool using the 'pg' library
const pool = new Pool({ connectionString });

// 2. Wrap the pool in Prisma's official PostgreSQL adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter into the Prisma Client (This is the Prisma 7 way)
const prisma = new PrismaClient({ adapter });

export default prisma;