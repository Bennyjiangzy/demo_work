import { Router, Request, Response } from 'express';
import * as translateapiController from '../controllers/translate'
const router: Router = Router();


router.post('/', (req: Request, res: Response) => {
    translateapiController.posttexttotranslate(req, res);
  });

export default router;