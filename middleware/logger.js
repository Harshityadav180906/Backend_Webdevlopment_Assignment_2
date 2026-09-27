// Custom Logger Middleware
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();

  // Logs Method, URL, and Time to the console
  console.log(`[${timestamp}] ${method} ${url}`);

  // Pass control to the next middleware or route handler
  next();
};

module.exports = logger;