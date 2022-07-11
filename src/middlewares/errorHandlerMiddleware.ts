import {Request, Response, NextFunction} from "express";

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
    console.log(error.response);
    if (error.status) {
        return res.status(error.status).send(error.message);
    }
    if(error.message) {
        return res.status(400).send(error.message);
    }

    res.sendStatus(500); // internal server error
}