import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';

const userRepository = new UserRepository();

export class AuthController {
  signup = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ email, hashedPassword });

    res.status(201).json({
      message: 'User created',
      user: { id: user.id, email: user.email },
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    // Set token in response header
    res.setHeader('Authorization', `Bearer ${token}`);

    // Return user info (without token in body, since it's in header)
    res.status(200).json({
      id: user.id,
      email: user.email,
    });
  });

  logout = asyncHandler(async (_req: Request, res: Response) => {
    res.json({ message: 'Logged out' });
  });
}
