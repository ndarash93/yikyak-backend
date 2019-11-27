module.exports = function makeProtectRoute(verify){
  return function protectRoute(req, res, next){
    if(verify(req.body.accessToken)){
      next();
    }
    res.status(401).send({message: 'Unauthorized'});
  }
}