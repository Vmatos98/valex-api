import { Request, Response, NextFunction } from "express";

async function keyValidator(req: Request, res: Response, next: NextFunction) {
    const key = req.headers["x-api-key"];
    if (!key) {
        throw { status: 400, message: "Header is required" };
    }
    res.locals.key = key;
    next();
}

export default keyValidator;