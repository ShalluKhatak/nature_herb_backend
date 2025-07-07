import router from 'express';
import {
  signupController,
  signupControllerPost,
} from '../controller/signupController.js';

export const signupRoutes = router();

// signupRoutes.get('/', signupController);
signupRoutes.post('/', signupControllerPost);
