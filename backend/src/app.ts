import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

// routers
import dogapiRouter from './router/dogapi';
import translateRouter from './router/translateapi';
import jokerRouter from './router/jokeapi';

// CORS, JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use router
app.use('/dog', dogapiRouter);
app.use('/translate', translateRouter);
app.use('/joke', jokerRouter);

// actual port listen
app.listen(8000, () => {
  console.log('listen on port 8000');
});