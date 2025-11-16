import TransactionModel from "../models/transaction.model.js";
import { ApiErrorResponse } from "../utils/ApiErrorResponse.js";
import { ApiSuccessResponse } from "../utils/ApiSuccessResponse.js";

export const getAnalyticsSummary = async (req, res, next) => {
  try {
    const { groupBy, startDate, endDate, minAmount } = req.query;

    const allowed = ["region", "productCategory", "customerTier"];
    if (!allowed.includes(groupBy)) {
      throw new ApiErrorResponse(
        400,
        "GroupBy must be one of: region, productCategory, customerTier"
      );
    }

    const match = {};

    if (startDate || endDate) {
      match.timestamp = {};
      if (startDate) match.timestamp.$gte = new Date(startDate);
      if (endDate) match.timestamp.$lte = new Date(endDate);
    }

    if (minAmount !== undefined && minAmount !== null && minAmount !== "") {
      match.salesAmount = { $gte: Number(minAmount) };
    }

    const pipeline = [
      { $match: match },

      {
        $group: {
          _id: `$${groupBy}`,
          totalSales: { $sum: "$salesAmount" },
          totalTransactions: { $sum: 1 },
          averageSale: { $avg: "$salesAmount" },
        },
      },

      {
        $project: {
          _id: 0,
          groupName: "$_id",
          totalSales: 1,
          totalTransactions: 1,
          averageSale: 1,
        },
      },

      { $sort: { totalSales: -1 } },
    ];

    const dataList = await TransactionModel.aggregate(pipeline).allowDiskUse(
      true
    );

    return res.status(200).json(
      new ApiSuccessResponse(200, "Analytics Summary fetched successfully", {
        dataList,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getTransactionsData = async function (req, res, next) {
  try {
    let {
      page = 1,
      limit = 10,
      sortBy = "timestamp",
      order = "desc",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skipValue = (page - 1) * limit;
    const orderValue = order === "desc" ? -1 : 1;

    const totalRows = await TransactionModel.estimatedDocumentCount();
    const totalPages = Math.ceil(totalRows / limit);

    const dataList = await TransactionModel.find({})
      .sort({ [sortBy]: orderValue })
      .skip(skipValue)
      .limit(limit)
      .lean();

    return res.status(200).json(
      new ApiSuccessResponse(200, "Transaction data fetched successfully", {
        currentPage: page,
        totalPages,
        totalRows,
        limit,
        dataList,
      })
    );
  } catch (error) {
    next(error);
  }
};
