import * as repositorie from "../repositories/employeeRepository.js"

async function checkEmployee(id: number){
    const result = await repositorie.findById(id);
    return result;
}

export{ 
    checkEmployee
}