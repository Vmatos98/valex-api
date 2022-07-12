import bcrypt from 'bcrypt';

import * as repositorie from '../repositories/rechargeRepository.js';
import * as company from "../services/companiServices.js";
import * as employeeRepositorie from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js";
import * as businessRepositorie from "../repositories/businessRepository.js";
import * as payments from "../repositories/paymentRepository.js";


async function recharge(key: string, id: number, amount: number, employeeId: number) {
    const companyData = await company.checkCompany(key);
    const employeeData = await employeeRepositorie.findById(employeeId);
    if(employeeData.companyId !== companyData.id) {
        throw {status:422, message:'Employee not found'};
    }
    return await repositorie.insert({cardId: id, amount});
}

async function purchases(cardId: number, amount: number, businessId: number, password: string) {
    const card = await cardRepository.findById(cardId);
    if(!bcrypt.compareSync(password, card.password)){
        throw {status:422, message:'Password is incorrect'};
    }
    const businessData = await businessRepositorie.findById(businessId);
    if(card.type !== businessData.type) {
        throw {status:422, message:'Card type is incorrect'};
    }
    const balance = await getBalance(cardId);
    if(balance < amount) {
        throw {status:422, message:'Not enough money'};
    }
    console.log(balance, amount);
    return await payments.insert({cardId, businessId, amount});
    
}

async function getBalance(cardId: number) {
    const rechargesAmount = await repositorie.sumAmountByCardId(cardId);
    const paymentsAmount = await payments.sumAmountByCardId(cardId);
    const amount = (+rechargesAmount.sum) - (+paymentsAmount.sum);
    return amount;
}

async function getTransactions(cardId: number) {
    const rechargesTransactions = await repositorie.findByCardId(cardId);
    const paymentsTransactions = await payments.findByCardId(cardId);
    return {
        rechargesTransactions,
        paymentsTransactions
    }
}

export{
    recharge,
    purchases,
    getBalance,
    getTransactions
}