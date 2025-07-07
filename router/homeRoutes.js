import { Router } from 'express';
import { homeController } from '../controller/homeController.js';
// import { loginMiddleware } from '../middleware/loginMiddleware.js';

export const homeRoutes = Router();

console.log('enter :>> ', 'enter');
homeRoutes.get('/', homeController);
// homeRoutes.get('/', homeController);
