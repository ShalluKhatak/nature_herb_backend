import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  userModel  from '../model/userModel.js'; // Adjust the import based on your project structure

const JWT_SECRET = 'your_jwt_secret_key'; // store in .env
export const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check for required fields
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required.' });
        }
    
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email.' });
        }
    
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid password.' });
        }
    
        // Optional: Generate JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: '1d' }
        );
    
        // Respond with token or user info
        res.status(200).json({ message: 'Login successful', token, user });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

// export const loginControllerPost = async (req, res) => {
//   console.log('3333333 :>> ', 3333333);
//   const { email, password } = req?.body;
//   console.log('req?.body :>> ', req?.body);
//   if (!(Boolean(email?.trim()) && Boolean(password?.trim()))) {
//     return res.status(400).send('Something went wrong');
//   }
//   const [db_cont] = await DB_Connection.query(CHECK_USER_WITH_EMAIL, [email]);
//   if (db_cont.length === 0) {
//     return res.status(400).send('user does not exists with this mail.');
//   }

//   const {
//     password: user_password = ' ',
//     email: user_email = ' ',
//     name: user_name = ' ',
//   } = db_cont[0];

//   const match = await bcrypt.compare(password, user_password);
//   if (match) {
//     const token = jwt.sign(
//       {
//         email: user_email,
//         name: user_name,
//       },
//       process.env.SECRET_KEY,
//       {
//         expiresIn: '1h',
//       },
//     );

//     console.log('token:>>', token);
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'Strict',
//     });
//     // res.send('Login');

//     console.log('`dhgijskjg` :>> ', `dhgijskjg`);
//     res.status(200).json({
//       msg: 'login',
//     });
//   } else {
//     return res.status(400).send('Something went wrong');
//   }
// };
