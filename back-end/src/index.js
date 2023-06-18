import 'dotenv/config';
import express from 'express';
import { authRouter } from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(authRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT);

console.log(`Server listening on port ${PORT}`)