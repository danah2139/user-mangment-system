import '../setup'; // Ensure this is at the top
import { expect } from 'chai';
import { createUser, findUserByEmail } from '../../src/services/user.service';
import sequelize from '../../src/models';

describe('User Service', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new user', async () => {
    const user = await createUser({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    expect(user).to.have.property('id');
    expect(user).to.have.property('name', 'John Doe');
    expect(user).to.have.property('email', 'john@example.com');
  });

  it('should find a user by email', async () => {
    const user = await findUserByEmail('john@example.com');
    expect(user).to.not.be.null;
    expect(user).to.have.property('email', 'john@example.com');
  });
});