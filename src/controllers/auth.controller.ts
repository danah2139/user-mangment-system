import { Request, Response } from 'express';
import bcrypt from 'bcrypt';  // Ensure bcrypt is imported correctly
import { generateToken } from '../utils/jwt';
import { createUser, findUserByEmail } from '../services/user.service';
import { AuthRequest } from '../types/auth';

export const register = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newUser = await createUser({ name, email, password });
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};

export const login = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.id);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error });
    }
};