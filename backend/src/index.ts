// backend/src/index.ts

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Database connection error:', error));

app.get('/', (req, res) => {
  res.send('Rental Property Analysis API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
