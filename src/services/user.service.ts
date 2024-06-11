import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { UserCreationAttributes, UserAttributes } from '../types/user';

export const createUser = async (userData: UserCreationAttributes): Promise<UserAttributes> => {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password!, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    return newUser;
};

export const findUserByEmail = async (email: string): Promise<UserAttributes | null> => {
    const user = await User.findOne({ where: { email } });
    return user;
};