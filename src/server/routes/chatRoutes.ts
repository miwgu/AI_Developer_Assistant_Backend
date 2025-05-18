import { Router } from 'express';
const router = Router();
const chatController = require ('../controllers/chatController');

router.post('/query', chatController.postQuery);
router.get('/getchatlog', chatController.getChats);

export default router;