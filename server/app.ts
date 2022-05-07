import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { notFundError, serverError } from './error';
import routes from './routes';

require('env2')('.env');

const app = express();
const { NODE_ENV } = process.env;

app.disable('x-powered-by');

app.use([
  compression(),
  cors(),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
]);

app.set('port', process.env.PORT || 8000);

app.use('/api/v1/', routes);

if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(notFundError);
app.use(serverError);

export default app;
