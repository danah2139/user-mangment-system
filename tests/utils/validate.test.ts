import { expect } from 'chai';
import { validateRegister, validateLogin } from '../../src/utils/validation';

describe('Validation Utilities', () => {
    describe('validateRegister', () => {
        it('should validate valid registration data', () => {
            const validData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            };
            const { error } = validateRegister(validData);
            expect(error).to.be.undefined;
        });

        it('should invalidate registration data with missing fields', () => {
            const invalidData = {
                email: 'john@example.com',
                password: 'password123',
            };
            const { error } = validateRegister(invalidData);
            expect(error).to.not.be.undefined;
        });

        it('should invalidate registration data with invalid email', () => {
            const invalidData = {
                name: 'John Doe',
                email: 'johnexample.com',
                password: 'password123',
            };
            const { error } = validateRegister(invalidData);
            expect(error).to.not.be.undefined;
        });

        it('should invalidate registration data with invalid password', () => {
            const invalidData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'pass',
            };
            const { error } = validateRegister(invalidData);
            expect(error).to.not.be.undefined;
        });
    });

    describe('validateLogin', () => {
        it('should validate valid login data', () => {
            const validData = {
                email: 'john@example.com',
                password: 'password123',
            };
            const { error } = validateLogin(validData);
            expect(error).to.be.undefined;
        });

        it('should invalidate login data with missing fields', () => {
            const invalidData = {
                email: 'john@example.com',
            };
            const { error } = validateLogin(invalidData);
            expect(error).to.not.be.undefined;
        });

        it('should invalidate login data with invalid email', () => {
            const invalidData = {
                email: 'johnexample.com',
                password: 'password123',
            };
            const { error } = validateLogin(invalidData);
            expect(error).to.not.be.undefined;
        });

        it('should invalidate login data with invalid password', () => {
            const invalidData = {
                email: 'john@example.com',
                password: 'pass',
            };
            const { error } = validateLogin(invalidData);
            expect(error).to.not.be.undefined;
        });
    });
});