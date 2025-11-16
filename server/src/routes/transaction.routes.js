import express from "express";
import {
  getAnalyticsSummary,
  getTransactionsData,
} from "../controllers/transactionsController.js";
const router = express.Router();

router.get("/transactions", getTransactionsData);
router.get("/analytics/summary", getAnalyticsSummary);

export default router;
