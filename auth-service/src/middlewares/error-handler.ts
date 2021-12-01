import { Request, Response, NextFunction } from "express"

import { RequestValdationError } from "../errors/request-validation-error"
import { DatabaseConnectionError } from "../errors/database-connection-error"

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof RequestValdationError) {
        console.log("Handling error as request validation error")
    }

    if (err instanceof DatabaseConnectionError) {
        console.log("Handling error as a database connection error")
    }

    res.status(400).send({
        message: err.message
    })
}
