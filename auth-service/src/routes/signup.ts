import express, { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import { RequestValdationError } from "../errors/request-validation-error"
import { DatabaseConnectionError } from "../errors/database-connection-error"

const router = express.Router()

router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage(
                "Password must be between 4 and 20 characters"
            )
            .isAlphanumeric()
            .withMessage(
                "Password must contain alphanumeric characters only"
            )
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new RequestValdationError(errors.array())
        }

        const { email, password } = req.body

        console.log(
            `create user with email: ${email} and password: ${password}`
        )
        throw new DatabaseConnectionError()

        // res.send({})
    }
)

export { router as signUpRouter }
