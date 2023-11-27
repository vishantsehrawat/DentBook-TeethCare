const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON", success: false });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ message: "Validation Error", errors });
  }

  if (err.name === "NotFound") {
    return res
      .status(404)
      .json({ message: "Resource not found", success: false });
  }

  if (err.name === "AuthenticationError") {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    success: false,
    error: err.message,
  });
};

module.exports = { errorHandler };
