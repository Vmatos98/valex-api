import { Request, Response, NextFunction } from "express";
import Cryptr from "cryptr";
import dayjs from 'dayjs';
import * as cardRepository from "../repositories/cardRepository.js";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET||'secret');

export default async function validateCard(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    let cardId = req.body.cardId?req.body.cardId:+id;
    res.locals.cardId = cardId;
    const card= await cardRepository.findById(cardId);
    if(!card) {
        throw {status:422, message:'Card not found'};
    }
    if(card.isBlocked) {
        // throw {status:422, message:'Card is blocked'};
        res.locals.isBlocked = true;
    }else{
        res.locals.isBlocked = false;
    }
    if(req.body.cvc){
        if(cryptr.decrypt(card.securityCode) !== req.body.cvc) {
            throw {status:422, message:'CVC is incorrect'};
        }
    }
    if(card.expirationDate < dayjs().format('MM/YY')) {
        throw {status:422, message:'Card is expired'};
    }
    res.locals.employeeId = card.employeeId;
    next();
}