// import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const SECRET_KEY_USER = process.env.SECRET_KEY || 'your_secret_key_new';

export const loginMiddleware = (req, res, next) => {
  // Get token from Authorization header or HTTP-only cookies

  const token =
    req.cookies?.token || req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.redirect('/login');
  }

  try {
    // Verify JWTĪ
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('token :>> ', token);
    console.log('decoded :>> ', decoded);
    req.user = decoded; // Attach decoded payload to request object
    console.log('req.user :>> ', req.user);
    console.log('44444 :>> ', 44444);
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log('1111111 :>> ', 1111111);
    if (error.name === 'TokenExpiredError') {
      console.log('222222 :>> ', 222222);
      console.error('Token has expired:', error);
      return res.redirect('/login');
    } else {
      console.log('333333 :>> ', 333333);
      console.error('JWT verification error:', error);
      return res.status(403).json({ error: 'Invalid token.' });
    }
  }
};
