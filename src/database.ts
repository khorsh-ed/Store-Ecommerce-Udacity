import dotenv from 'dotenv'
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV == 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB
});

client.on('error', (error: Error) => {
  console.error(`Error: ${error.message}`)
})

export default client;