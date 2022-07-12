import { faker } from '@faker-js/faker/locale/de'
import Cryptr from "cryptr";
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepositorie from "../repositories/employeeRepository.js"

const cryptr = new Cryptr(process.env.CRYPTR_SECRET||'secret');

async function createCard(type: cardRepository.TransactionTypes, employeeId: number, companyId: number) {
    
    const employeeData = await employeeRepositorie.findById(employeeId);
    if(employeeData.companyId !== companyId) {
        throw {status:422, message:'Employee not found'};
    }
    const checkType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(checkType) {
        throw {status:422, message:'Card already exists'};
    }
    const card = {
        employeeId: employeeId,
        number: faker.finance.creditCardNumber(),
        cardholderName: formatName(employeeData.fullName),
        securityCode: cryptr.encrypt(faker.finance.creditCardCVV()),
        expirationDate: expirationDate(),
        isVirtual: false,
        isBlocked: false,
        type: type,
        companyId: companyId
    };
    // console.log(card);
    console.log(cryptr.decrypt(card.securityCode));
    await cardRepository.insert(card);
    return { 
        number: card.number,
        cardholderName: card.cardholderName,
        type: card.type
    }
}

async function activateCard(cvc: string, password: string, cardId: number) {
    const card = await cardRepository.findById(cardId);
    if(card.password){
        throw {status:422, message:'Card is already activated'};
    }
    return await cardRepository.update(cardId, {password: bcrypt.hashSync(password, 10)});
}

async function blockCard(id: number, password: string){
    const card = await cardRepository.findById(id);
    if(bcrypt.compareSync(password, card.password)) {
        return await cardRepository.update(id, {isBlocked: true});
    }
    throw {status:422, message:'Password is incorrect'};
}

async function unblockCard(id: number, password: string){
    const card = await cardRepository.findById(id);
    if(bcrypt.compareSync(password, card.password)) {
        return await cardRepository.update(id, {isBlocked: false});
    }
    throw {status:422, message:'Password is incorrect'};
}

function formatName(name: string) {
    const allName = name.split(' ');
    const firstName = allName[0];
    const lastName = allName[allName.length - 1];
    let middleName = '';
    if(allName.length > 2) {
        for(let i = 1; i < allName.length - 2; i++) {
            if(allName[i].length >2) {
                middleName += allName[i].slice(0, 1).toUpperCase() + ' ';
            }
        }
        
        return `${firstName} ${middleName}${lastName}`;
    }
}

function expirationDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 5);
    return dayjs(date.toISOString().split('T')[0]).format('MM/YY');
}

export { 
    createCard,
    activateCard,
    blockCard,
    unblockCard
}