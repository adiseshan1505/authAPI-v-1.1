import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export function authMiddleware(req, res, next) {
    const token = req.headers.token;
    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        if (decodedInfo) {
            req.userId = decodedInfo.id;
            next();
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}