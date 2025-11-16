const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    data: err.data || null,
  });
};

export default globalErrorHandler;
