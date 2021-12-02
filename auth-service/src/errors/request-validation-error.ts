import { ValidationError } from "express-validator"
import { CustomError } from "./custom-error"

export class RequestValdationError extends CustomError {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super("Invalid request parameters")

        // Typescript technicality: the following line of code must be written when extending a built in class
        Object.setPrototypeOf(this, RequestValdationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param }
        })
    }
}
