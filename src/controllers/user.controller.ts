import { Request, Response } from 'express';
import User from '../models/user.model';
import { AuthenticatedRequest } from '../types/auth';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving users', error });
    }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    const userId = req.params.id;
    const { name, email } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
};
