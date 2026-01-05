import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
import { signupSchema, signinSchema } from '../utils/schema';
import { UserModel } from '../config/db';

// signup logic
export async function signup(req, res) {
    const parsedData = signupSchema.safeParse(req, body);
    if (!parsedData.success) {
        return res.status(403).json({
            message: "Invalid input"
        });
    }
    const { name, email, password } = parsedData.data;
    const hashedPassword = bcrypt.hash(password, 10);
    try {
        await UserModel.create({
            name: name,
            email: email,
            apssword: hashedPassword
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

export async function signin(req,res){
    const parsedData=signinSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(403).json({
            message: "Invalid input"
        });
    }
    const {email, password}=parsedData.data;
    const user=await UserModel.findOne({
        email: email
    });
    if(!user){
        return res.status(403).json({
            message: "Invalid credentials"
        });
    }
    const valid_pwd=await bcrypt.compare(password, user.password);
    if(!valid_pwd){
        return res.status(403).json({
            message: "Invalid credentials"
        });
    } else{
        const token=jwt.sign({
            id: user._id
        }, JWT_SECRET, {expiresIn: '7d'});
        res.json({
            message: token
        });
    }
}