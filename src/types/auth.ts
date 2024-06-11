import { Request } from 'express';

export interface AuthRequest extends Request {
    body: {
        name?: string;
        email: string;
        password: string;
    };
}

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
    };
}

export interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}