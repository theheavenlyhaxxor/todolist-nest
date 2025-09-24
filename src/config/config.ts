export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  database: {
    databaseName: process.env.DATABASE_NAME,
    databaseHost: process.env.DATABASE_HOST,
    databasePort: process.env.DATABASE_PORT,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    databaseUri: process.env.DATABASE_URI,
  },
  port: process.env.PORT,
});
