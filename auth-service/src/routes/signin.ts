import express from "express"

const router = express.Router()

router.post("/api/users/signin", (req, res) => {
    res.send("sign in user")
})

export { router as signInRouter }
