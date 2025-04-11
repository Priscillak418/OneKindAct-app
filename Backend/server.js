import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import donationRouter  from './routes/donationRoutes.js';
import donorRouter from './routes/donorRoutes.js';
import {errorHandler} from './middleware/errorMiddleware.js';
import authRouter from "./routes/authRoutes.js"

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Connect to MongoDB
connectDB();

const port = process.env.PORT

//routes
app.use('/api/donations', donationRouter);
app.use('/api/donors', donorRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


