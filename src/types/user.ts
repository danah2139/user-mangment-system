export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes extends Partial<UserAttributes> {}