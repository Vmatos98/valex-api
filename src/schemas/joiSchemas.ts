import joi from "joi";

const createCardSchema= joi.object({
    employeeId: joi.number().required(),
    type: joi.string().required()
})

const activateCardSchema = joi.object({
    cvc: joi.string().length(3).required(),
    password: joi.string().length(4).required(),
    cardId: joi.number().required()
});

const validateCardSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().length(4).required(),
});

const rechargeSchema = joi.object({
    amount: joi.number().min(1).required(),
    cardId: joi.number().required()
});

const purchasesSchema = joi.object({
    cardId: joi.number().required(),
    amount: joi.number().min(1).required(),
    password: joi.string().length(4).required(),
    businessId: joi.number().required()
})

export { 
    createCardSchema,
    activateCardSchema,
    validateCardSchema,
    rechargeSchema,
    purchasesSchema
}