export default () => ({
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: process.env.POSTGRES_SSL_REJECT
      ? {
          rejectUnauthorized: true,
        }
      : undefined, // not required for localhost,
    synchronize: Boolean(process.env.POSTGRES_SYNC) || true,
  },
});