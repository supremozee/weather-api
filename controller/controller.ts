import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import crypto from 'crypto';

function generateSecretKey(length: number) {
  return crypto.randomBytes(length).toString('hex');
}

const secretKey = generateSecretKey(32);
console.log('Generated Secret Key:', secretKey);
class AuthController {
  static async signup(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, confirmPassword } = req.body;
      const user = await UserModel.findOne({email})
      if(user) {
        return res.json("email already esist, sign in instead")
      }
      
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AuthController;
