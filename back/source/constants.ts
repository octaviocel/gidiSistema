require('dotenv').config();

export const _dbName = process.env.DB_NAME;
export const _dbHost = process.env.DB_HOST;
export const _dbUser = process.env.DB_USER;
export const _dbPort = process.env.DB_PORT;
export const _dbPassword = process.env.DB_PASSWORD;
export const _dbSync = process.env.API_DB_SYNC === "true" ? true : false;

export const _s3KeyId = process.env.Q_ACCESS_KEY_ID;
export const _s3Secret = process.env.Q_SECRET_ACCESS_KEY;
export const _s3Region = process.env.Q_AWS_REGION;
export const _s3Bucket = process.env.Q_S3_BUCKET;

export const _token = process.env.TOKEN_SECRET;
