import userSchema from "../models/userSchema.js";
import jwt from "jsonwebtoken";
let createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET)
}
export const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let data = await userSchema.findOne({ email: email })
        if (!data) return res.json({ error: true })
        else {
            let token = createToken(data._id)
            if (data.password == password) return res.json({ error: false, token })
            else return res.json({ error: true })
        }
    }
    catch (e) {
        console.log(e.message);
    }
}
export const register = async (req, res) => {
    let { email, password } = req.body
    try {
        let person = await userSchema.findOne({ email: email })
        if (person) return res.json({ error: true })
        let user = userSchema({
            email: email,
            password: password
        })
        await user.save()
        let token = createToken(user._id)
        res.status(200).json({ error: false, token })
    }
    catch (e) {
        console.log(e.message)
    }
}