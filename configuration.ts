import dotenv from 'dotenv'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env

var config =  {
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV == 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  token: TOKEN_SECRET,
}

export default config;