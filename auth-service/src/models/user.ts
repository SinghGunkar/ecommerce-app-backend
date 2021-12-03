import mongoose from "mongoose"

// An interface that describes the types that are needed to create a new user
interface UserAttributes {
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        // note: type in the line below does not refer to typescript
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<any> {
    build(attributes: UserAttributes): any
}

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes)
}

const User = mongoose.model<any, UserModel>("user", userSchema)

export { User }
