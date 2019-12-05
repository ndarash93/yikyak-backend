module.exports = function makeProtectRoute(verify) {
  return function protectRoute(req, res, next) {
    try {
      const auth = verify(req.body.accessToken);
      req.auth = auth;
      next();
    } catch (e) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
