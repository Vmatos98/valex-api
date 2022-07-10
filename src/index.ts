import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import cardRoutes from "./routes/cardRoutes.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(json());
app.use(cardRoutes);
app.use(errorHandler);


app.listen(PORT, () =>{console.log(`Server running on port ${PORT}`)});