import express from 'express';
import routes from './routes/index';
import db from './database'
import { Request, Response } from 'express';
const app = express();

const port = 3000;
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use('/api', routes);

app.use((_req: Request, res: Response) => {
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

export default app;
