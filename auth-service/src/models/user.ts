import mongoose from "mongoose"
import { Password } from "../helpers/password"

// An interface that describes the types that are needed to create a new user
interface UserAttributes {
    email: string
    password: string
}

// An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes): UserDocument
}

// An interface that describes the properties that a User Document has
interface UserDocument extends mongoose.Document {
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        // Note: type in the line below does not refer to typescript
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes)
}

userSchema.pre("save", async function (done) {
    // Note: want to run this code only if the password is modified
    if (this.isModified("password")) {
        const hashedPassword = await Password.toHash(
            this.get("password")
        )
        this.set("password", hashedPassword)
    }
    done()
})

const User = mongoose.model<UserDocument, UserModel>(
    "user",
    userSchema
)

export { User }
