import { Request, Response } from "express";

import * as validate from "../schemas/joiSchemas.js";
import * as services from "../services/financialServices.js";

async function recharge(req:Request, res: Response) {
    const { error } = validate.rechargeSchema.validate(req.body);
    if (error) {
        throw {status: 400, message: error.details[0].message};
    }
    if(res.locals.isBlocked){
        throw {status:422, message:'Card is blocked'};
    }
    const key = res.locals.key;
    const employeeId = res.locals.employeeId; 
    await services.recharge(key, req.body.cardId, req.body.amount, employeeId);
    return res.status(201).send("Recharge successful");
}

async function purchases(req: Request, res: Response){
    const { error } = validate.purchasesSchema.validate(req.body);
    if (error) {
        throw {status: 400, message: error.details[0].message};
    }
    if(res.locals.isBlocked){
        throw {status:422, message:'Card is blocked'};
    }
    const result = await services.purchases( req.body.cardId, req.body.amount, req.body.businessId, req.body.password);
    return res.status(201).send(result);
}

async function extract(req: Request, res: Response){
    
    const balance = await services.getBalance(res.locals.cardId);
    const extract = await services.getTransactions(res.locals.cardId);
    
    return res.status(201).send({balance, "transactions": extract.paymentsTransactions, "recharges": extract.rechargesTransactions});
}

export {
    recharge,
    purchases,
    extract
}