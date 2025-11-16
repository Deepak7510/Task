import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
const app = express();
import dotenv from "dotenv";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import TransactionRouter from "../src/routes/transaction.routes.js";
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
const whitelist = [process.env.CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PETCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 15 * 60 * 60,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(helmet());
app.use(compression());

app.use("/api/v1", TransactionRouter);

app.use(globalErrorHandler);

export default app;
