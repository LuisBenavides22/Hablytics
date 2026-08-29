import express, { Request, Response } from 'express';
import userRoutes from "./routes/userRoutes.js";
import auditlogRoutes from "./routes/auditlogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import cors from "cors";
import 'dotenv/config';


const PORT = process.env.PORT;

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
].filter((o): o is string => Boolean(o));

const corsOptions : cors.CorsOptions = {
    origin : (origin, callback) => {

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} not allowed`));
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/audits', auditlogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/reports', reportRoutes);

app.use('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'healthy'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});