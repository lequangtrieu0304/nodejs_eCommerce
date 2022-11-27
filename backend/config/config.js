import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGODB_URL: process.env.MONGODB_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
}