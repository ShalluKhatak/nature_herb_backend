import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { homeRoutes } from './router/homeRoutes.js';
import { signupRoutes } from './router/signUpRoutes.js';
import { loginRoutes } from './router/loginRoutes.js';
// import { logoutRouter } from './routes/logoutRouter.js';
// import {resetPasswordRouter} from './routes/resetPasswordRouter.js';
import mongoose from 'mongoose';



dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public')); //serve public files.
app.use(cookieParser());
app.set('view engine', 'ejs'); //ejs

app.use('/', homeRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
// app.use('/logout', logoutRouter);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ Connection error:', err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
