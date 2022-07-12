import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import cardRoutes from "./routes/cardRoutes.js";
import financialRoutes from "./routes/financialRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(json());
app.use(cardRoutes).use(financialRoutes);
app.use(errorHandler);


app.listen(PORT, () =>{console.log(`Server running on port ${PORT}`)});