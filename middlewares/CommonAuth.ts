import { Request, Response, NextFunction } from "express";
import { AuthPayLoad } from "../dto";
import { ValidateSign } from "../utility";

declare global{
    namespace Express{
        interface Request{
            user?: AuthPayLoad
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidateSign(req);

    if(validate){
        next();
    }else{
        return res.json({"message" : "Not authorized"});
    }
}