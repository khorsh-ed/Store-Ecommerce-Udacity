"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/api', index_1.default);
app.use((_req, res) => {
    res.status(404).send('<h2>some thing went wrong<h2>');
});
/*
app.get('/api', async (req, res) => {

  db.connect().then((client) => {
    return client
      .query('SELECT NOW()')
      .then((res) => {
        client.release()
        console.log('database connected',res.rows[0].now)
      })
      .catch((err) => {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
        console.log(err.stack)
      })
  })
  

});

*/
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
exports.default = app;
