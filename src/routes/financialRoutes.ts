import {Router} from "express";

import keyValidator from "../middlewares/headerMiddleware.js";
import validateCard from "../middlewares/validateCardMiddleware.js";
import * as financialControllers from "../controllers/financialControllers.js";
const financialRoutes = Router();

financialRoutes.post("/recharge", keyValidator, validateCard, financialControllers.recharge);
financialRoutes.post("/purchases", validateCard, financialControllers.purchases);
financialRoutes.get("/extract/:id", validateCard, financialControllers.extract);

export default financialRoutes;