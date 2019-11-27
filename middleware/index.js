const { verifyAccess } = require("../crypto");
const makeProtectRoute = require("./protectRoute");

const protectRoute = makeProtectRoute(verifyAccess);

module.exports = {
  protectRoute
};
