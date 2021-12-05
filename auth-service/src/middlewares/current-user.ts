import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface UserPayload {
    id: string
    email: string
}

// Reach into the existing type declaration and augment the interface
// aka add an optional paramater of `currentUser`
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next()
    }

    // Note: conditional (!req.session?.jwt) is equivalent to: !req.session || !req.session.jwt
    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload

        req.currentUser = payload
    } catch (err) {
        next()
    }

    next()
}
