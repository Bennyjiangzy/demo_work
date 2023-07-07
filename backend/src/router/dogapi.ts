import { Router, Request, Response } from 'express';
import * as dogapiController from '../controllers/dog'
const router: Router = Router();

router.get('/image', (req: Request, res: Response) => {
    dogapiController.getdogimage(req, res);
  });
  
  router.post('/saveimage', (req: Request, res: Response) => {
    dogapiController.savedogimage(req, res);
  });
  
  router.post('/deleteimage', (req: Request, res: Response) => {
    dogapiController.deletedogimage(req, res);
  });
  
  router.get('/allimage', (req: Request, res: Response) => {
    dogapiController.getalldogimage(req, res);
  });

export default router;