import express from 'express';
import * as dogapiController from './../controllers/dog.js'
const router = express.Router();


router.get('/image',dogapiController.getdogimage)

router.post('/saveimage',dogapiController.savedogimage)

router.post('/deleteimage',dogapiController.deletedogimage)

router.get('/allimage',dogapiController.getalldogimage)

export default router;