import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

export default app;