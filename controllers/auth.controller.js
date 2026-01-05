import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
import { signupSchema, signinSchema } from '../utils/schema.js';
import { UserModel } from '../config/db.js';

// signup logic
export async function signUp(req, res) {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(403).json({
            message: "Invalid input"
        });
    }
    const { name, email, password } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        res.json({
            message: "You are signed up"
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(403).json({
                message: "User already exists"
            });
        }
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

//signin logic
export async function signIn(req, res) {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(403).json({
            message: "Invalid input"
        });
    }
    const { email, password } = parsedData.data;
    const user = await UserModel.findOne({
        email: email
    });
    if (!user) {
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }
    const check_pwd = await bcrypt.compare(password, user.password);
    if (!check_pwd) {
        return res.status(403).json({
            message: "Invalid credentials"
        });
    } else {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: token
        });
    }
}