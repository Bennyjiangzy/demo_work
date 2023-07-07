import { Router, Request, Response } from 'express';
import * as jokeController from '../controllers/joke'
const router: Router = Router();



router.post('/', (req: Request, res: Response) => {
    jokeController.getjoke(req, res);
  });
  
export default router;