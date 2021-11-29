import express from "express"
import { json } from "body-parser"

import { currentUserRouter } from "./routes/current-user"
// import { signInRouter } from "./routes/signin"
// import { signOutRouter } from "./routes/signout"
import { signUpRouter } from "./routes/signup"

const app = express()
app.use(json())

app.use(currentUserRouter)
// app.use(signInRouter)
// app.use(signOutRouter)
app.use(signUpRouter)

app.listen(4000, () => {
    console.log("auth-service is listening on port 4000!")
})