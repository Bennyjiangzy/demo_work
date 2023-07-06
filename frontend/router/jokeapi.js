import express from 'express';
import * as jokeController from './../controllers/joke.js'
const router = express.Router();

router.post('/',jokeController.getjoke)

export default router;