import {Router} from "express";

import keyValidator from "../middlewares/headerMiddleware.js";
import validateCard from "../middlewares/validateCardMiddleware.js";
import * as cardControllers from "../controllers/cardControllers.js";

const cardRoutes = Router();

cardRoutes.post("/newCard", keyValidator, cardControllers.createCard);
cardRoutes.post("/activateCard", validateCard, cardControllers.activateCard);
cardRoutes.post("/blockCard", validateCard, cardControllers.blockCard);
cardRoutes.post("/unblockCard", validateCard, cardControllers.unblockCard);

export default cardRoutes;