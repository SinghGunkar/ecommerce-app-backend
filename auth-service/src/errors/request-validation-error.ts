import { ValidationError } from "express-validator"

export class RequestValdationError extends Error {
    constructor(public errors: ValidationError[]) {
        super()

        // Typescript technicality: must write the following line of code when extending a built in class
        Object.setPrototypeOf(this, RequestValdationError.prototype)
    }
}
