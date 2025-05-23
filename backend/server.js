import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
import movieRouter from './routes/movies.js';
import authRouter from './routes/auth.js';
import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { appDataSource } from './datasource.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

const apiRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const app = express();

    app.use(logger('dev'));
    app.use(
      cors({
        credentials: true,
        origin: (process.env.NODE_ENV = `http://localhost:3000`),
      }),
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }));

    // Register routes
    apiRouter.get('/', (req, res) => {
      res.send('Hello from Express!');
    });
    apiRouter.use('/users', usersRouter);
    apiRouter.use('/movies', movieRouter);
    apiRouter.use('/auth', authRouter);

    // Register API router
    app.use('/api', apiRouter);

    // Register frontend
    const publicPath = new URL('./public', import.meta.url).pathname;
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });

    // Register 404 middleware and error handler
    app.use(routeNotFoundJsonHandler); // this middleware must be registered after all routes to handle 404 correctly
    app.use(jsonErrorHandler); // this error handler must be registered after all middleware to catch all errors

    const port = parseInt(process.env.PORT || '8080');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
