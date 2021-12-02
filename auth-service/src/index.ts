import express from "express"
import { json } from "body-parser"
import "express-async-errors"
import mongoose from "mongoose"

import { currentUserRouter } from "./routes/current-user"
import { signInRouter } from "./routes/signin"
import { signOutRouter } from "./routes/signout"
import { signUpRouter } from "./routes/signup"

import { errorHandler } from "./middlewares/error-handler"

import { NotFoundError } from "./errors/not-found-error"

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all("*", async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

const startUp = async () => {
    try {
        await mongoose.connect(
            "mongodb://auth-mongo-service:27017/authDatabase"
        )
        console.log("connected to mongodb")
    } catch (err) {
        console.log(err)
    }

    app.listen(4000, () => {
        console.log("auth-service is listening on port 4000!")
    })
}

startUp()
