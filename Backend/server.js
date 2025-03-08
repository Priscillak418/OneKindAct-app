import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import donationRouter  from './routes/donationRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

const port = 5000;

app.use('/', donationRouter);

app.get('/', (req, res) => {
  res.send('Hello, Priscilla!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


