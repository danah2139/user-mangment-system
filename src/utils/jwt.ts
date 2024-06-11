import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/auth';

const secret = process.env.JWT_SECRET!;

export const generateToken = (userId: number): string => {
    return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, secret) as TokenPayload;
};