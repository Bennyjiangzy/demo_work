import express from 'express';
import cors from 'cors';


const app = express();

/// routers
import dogapiRouter from './router/dogapi.js';
import translateRouter from './router/translateapi.js'
import jokerRouter from './router/jokeapi.js'

/// CORS, JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// use router
app.use('/dog',dogapiRouter);
app.use('/translate',translateRouter);
app.use('/joke',jokerRouter);

/// actual port listen
app.listen(8000, () => {
  console.log('listen on port 8000');
});