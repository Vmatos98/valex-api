import joi from "joi";

const cardSchema= joi.object({
    employeeId: joi.number().required(),
    type: joi.string().required()
})

export { 
    cardSchema
}