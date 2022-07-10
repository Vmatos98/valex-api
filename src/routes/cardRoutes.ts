import {Router} from "express";

import keyValidator from "../middlewares/headerMiddleware.js";
import * as cardControllers from "../controllers/cardControllers.js";

const cardRoutes = Router();

cardRoutes.post("/newCard", keyValidator, cardControllers.createCard);

export default cardRoutes;