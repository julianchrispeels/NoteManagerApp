import express from 'express';
import router from './routes/noteRoutes.js';
import cors from 'cors';

const app = express();

//app.use(cors())

app.use(cors({ origin: 'https://mswgsfgwleficsndtcdz.supabase.co' }));

//app.use(cors());

// middleware
app.use(express.json());

app.use(router);

export default app;