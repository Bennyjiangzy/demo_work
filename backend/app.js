import express from 'express';
import cors from 'cors';


const app = express();

// routers
import dogapiRouter from './router/dogapi.js';
import translateRouter from './router/translateapi.js'
import jokerRouter from './router/jokeapi.js'


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dog',dogapiRouter);
app.use('/translate',translateRouter);
app.use('/joke',jokerRouter);


// app.post('/test', (req, res) => {
//     const requestBody = JSON.stringify(req.body)
//     var test = JSON.parse(requestBody)
//     console.log(test)
//     test.text = test.text+"165"
//     res.send(test);

// });


app.listen(8000, () => {
  console.log('listen on port 8000');
});