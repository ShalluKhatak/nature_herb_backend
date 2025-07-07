import router from 'express';
import {
  loginController,
//   loginControllerPost,
} from '../controller/loginController.js';

export const loginRoutes = router();

loginRoutes.get('/', loginController);
// loginRoutes.post('/', loginControllerPost);
