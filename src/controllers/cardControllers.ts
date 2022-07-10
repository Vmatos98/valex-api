import { Request, Response } from "express";
import * as employee from "../services/employeeServices.js";
import * as company from "../services/companiServices.js";
import * as cardServices from "../services/cardServices.js";
import * as validate from "../schemas/joiSchemas.js";

async function createCard(req: Request, res: Response){
    const key = res.locals.key;
    const { error } = validate.cardSchema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message).status(400);
    }
    const companyData = await company.checkCompany(key);
    const result = cardServices.createCard(req.body.type, req.body.employeeId, companyData.id);
}

export { createCard };