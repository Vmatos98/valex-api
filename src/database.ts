import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

// const { Pool } = pg;
// export const connection = new Pool({
//   connectionString: process.env.DATABASE_URL_LOCAL,
// });
const { Pool } = pg;
const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

export const connection = new Pool(configDatabase);
