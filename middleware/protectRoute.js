module.exports = function makeProtectRoute(verify) {
  return function protectRoute(req, res, next) {
    try {
      verify(req.body.accessToken);
      next();
    } catch (e) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
