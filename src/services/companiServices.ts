import * as repositorie from "../repositories/companyRepository.js"

async function checkCompany(api:string){
    const result = await repositorie.findByApiKey(api);
    return result; 
}

export { 
    checkCompany
}