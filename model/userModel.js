import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/dz1qj3x8h/image/upload/v1709301234/default_user_image.png'
  },
  address: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
