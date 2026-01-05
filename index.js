import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(authRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});