module.exports = {
  errorHandler: (req, res, callback) => {
    try {
      callback();
    } catch (error) {
      const err = Object.keys(error).length ? error : { message: error };
      res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "Internal Server Error",
        error: err.error || "Internal Server Error",
      });
    }
  },
};
