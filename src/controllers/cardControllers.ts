import { Request, Response } from "express";
import * as employee from "../services/employeeServices.js";
import * as company from "../services/companiServices.js";
import * as cardServices from "../services/cardServices.js";
import * as validate from "../schemas/joiSchemas.js";

async function createCard(req: Request, res: Response){
    const key = res.locals.key;
    const { error } = validate.createCardSchema.validate(req.body);
    if (error) {
        throw {status: 400, message: error.details[0].message};
    }
    const companyData = await company.checkCompany(key);
    await cardServices.createCard(req.body.type, req.body.employeeId, companyData.id);
    return res.send('Card created').status(201);
}

async function activateCard(req: Request, res: Response){
    const { error } = validate.activateCardSchema.validate(req.body);
    if (error) {
        // return res.send(error.details[0].message).status(400);
        throw {status: 400, message: error.details[0].message};
    }
    if(res.locals.isBlocked) {
        throw {status:422, message:'Card is blocked'};
    }
    await cardServices.activateCard(req.body.cvc, req.body.password, req.body.cardId);
    return res.send('Card activated').status(201);
}

async function blockCard(req: Request, res: Response){
    const { error } = validate.validateCardSchema.validate(req.body);
    if (error) {
        throw {status: 400, message: error.details[0].message};
    }
    if(res.locals.isBlocked) {
        throw {status:422, message:'Card is blocked'};
    }
    await cardServices.blockCard(req.body.cardId, req.body.password);
    return res.send('Card blocked').status(201);
}

async function unblockCard(req: Request, res: Response){
    const { error } = validate.validateCardSchema.validate(req.body);
    if (error) {
        throw {status: 400, message: error.details[0].message};
    }
    if(!res.locals.isBlocked) {
        throw {status:422, message:'Card is activated'};
    }
    await cardServices.unblockCard(req.body.cardId, req.body.password);
    return res.send('Card unblocked').status(201);
}
export { createCard,
    activateCard,
    blockCard,
    unblockCard
};