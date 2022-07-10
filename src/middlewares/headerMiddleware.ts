import { Request, Response, NextFunction } from "express";

async function keyValidator(req: Request, res: Response, next: NextFunction) {
    const key = req.headers["x-api-key"].toString();
    if (!key) {
        return res.send("Header is required").status(401);
    }
    console.log(key);
    res.locals.key = key;
    next();
}

export default keyValidator;