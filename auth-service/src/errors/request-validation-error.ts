import { ValidationError } from "express-validator"

export class RequestValdationError extends Error {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super()

        // Typescript technicality: must write the following line of code when extending a built in class
        Object.setPrototypeOf(this, RequestValdationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param }
        })
    }
}
