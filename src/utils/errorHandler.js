module.exports = {
  errorHandler: async (req, res, callback) => {
    try {
      await callback();
    } catch (error) {
      try {
        console.log(error);
        const data = Object.values(error.errors);
        const error1 = [];
        data.forEach((ele) => {
          error1.push(ele.message);
        });
        res.status(403).json({ message: error1 });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  },
};
