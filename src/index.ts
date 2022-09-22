import express from 'express';
import routes from './routes/index';
import { Router, Request, Response } from 'express';
const app = express();

const port = 3000;
app.use('/api', routes);

app.use((_req:Request , res: Response) =>{
  res.status(404).send('<h2>some thing went wrong<h2>');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

export default app;
