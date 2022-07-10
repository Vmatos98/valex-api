import { faker } from '@faker-js/faker/locale/de'
import Cryptr from "cryptr";
import bcrypt from 'bcrypt';

import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepositorie from "../repositories/employeeRepository.js"

const cryptr = new Cryptr(process.env.CRYPTR_SECRET||'secret');

async function createCard(type: cardRepository.TransactionTypes, employeeId: number, companyId: number) {
    
    const employeeData = await employeeRepositorie.findById(employeeId);
    if(employeeData.companyId !== companyId) {
        throw new Error('Employee not found');
    }
    const checkType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(checkType) {
        throw new Error('Card already exists');
    }
    const card = {
        employeeId: employeeId,
        number: faker.finance.creditCardNumber(),
        cardholderName: formatName(employeeData.fullName),
        securityCode: cryptr.encrypt(faker.finance.creditCardCVV()),
        expirationDate: faker.date.future().toISOString().split('T')[0],
        isVirtual: false,
        isBlocked: false,
        type: type,
        companyId: companyId
    };
    console.log(card);
    
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

export { 
    createCard
}