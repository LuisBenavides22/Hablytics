import express = require('express');
import { Request, Response, NextFunction } from 'express';
import userRoutes from "./routes/userRoutes";
import auditlogRoutes from "./routes/auditlogRoutes";
import authRoutes from "./routes/authRoutes";
import limiter from './middleware/rateLimiter';
import 'dotenv/config';


const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes, limiter);
app.use('/api/audits', auditlogRoutes, limiter);
app.use('/api/auth', authRoutes, limiter);

app.use('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'healthy'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});