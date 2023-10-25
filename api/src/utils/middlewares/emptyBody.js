const isObjectEmpty = require("../isObjectEmpty");

const emptyBody = (req, res, next) => {
  if (!isObjectEmpty(req.body)) next();
  else throw new Error("Envíe como mínimo un campo");
};

module.exports = emptyBody;
