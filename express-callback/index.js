module.exports = function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      ip: req.ip,
      path: req.path,
      query: req.query,
      params: req.params,
      headers: {
        'Content-Type': req.get('Content-Type'),
        jwt: req.get('jwt')
      }
    }
    controller(httpRequest)
    .then(httpResponse => {
      res.set(httpResponse.headers);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    })
    .catch((e) => {
      res.status(500).json({Error: e.message});
    })
  }
}