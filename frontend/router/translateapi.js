import express from 'express';
import * as translateapiController from './../controllers/translate.js'
const router = express.Router();


router.post('/',translateapiController.posttexttotranslate)


export default router;