// import { ADD_NEW_USER, CHECK_USER_WITH_EMAIL } from '../db/query.js';
// import DB_Connection from '../utils/DbConnection.js';
import bcrypt from 'bcrypt';
// import { filePath } from '../utils/utilFunctions.js';
import userModel from '../model/userModel.js';

const salt_rounds = bcrypt.genSaltSync(10);

export const signupController = (req, res) => {
//   const signupFilePath = filePath('view', 'signup.html');
//   res.sendFile(signupFilePath);
};

export const signupControllerPost = async (req, res) => {
    try {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
      return res.status(400).send('All fields are required.');
    }
    
    const hashedPassword = await bcrypt.hash(password, salt_rounds);
    const user = new userModel({ name, email,  password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  if (new_user?.affectedRows > 0) {
    res.status(200).send('signup');
  } else {
    return res.status(400).send('User cannot registered.');
  }
};
