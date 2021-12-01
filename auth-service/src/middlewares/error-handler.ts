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
        const formattedErrors = err.errors.map(error => {
            return { message: error.msg, feld: error.param }
        })
        return res.status(400).send({ errors: formattedErrors })
    }

    if (err instanceof DatabaseConnectionError) {
        return res
            .status(500)
            .send({ errors: [{ message: err.reason }] })
    }

    res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    })
}
