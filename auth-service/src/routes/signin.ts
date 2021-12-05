import express, { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { RequestValdationError } from "../errors/request-validation-error"

const router = express.Router()

router.post(
    "/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("You must supply a password")
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new RequestValdationError(errors.array())
        }

        res.send({ message: "tryed to sign in" })
    }
)

export { router as signInRouter }
