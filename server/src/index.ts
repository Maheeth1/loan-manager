// src/index.ts
import express from 'express';
import cors from 'cors';
import router from './routes/applicationRoutes';

const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());

app.use('/api/applicationRoutes', router);

app.listen(4000, () => console.log('Server running on port 4000'));
