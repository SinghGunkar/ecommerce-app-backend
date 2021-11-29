import express from "express"

const router = express.Router()

router.get("/api/users/signup", (req, res) => {
    res.send("sign up user")
})

export { router as signUpRouter }
