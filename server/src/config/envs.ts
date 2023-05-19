import { config } from "dotenv";

config();

export default {
  elastic: {
    cloudID: process.env.ELASTIC_CLOUD_ID,
    apiKey: process.env.ELASTIC_API_KEY,
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
    host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
    ca: process.env.ELASTIC_CA,
    index: process.env.ELASTIC_INDEX,
  },
};
