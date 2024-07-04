import { hash, verify } from 'argon2'
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import * as authService from '../services/authService';

jest.mock('argon2');
jest.mock('jsonwebtoken');
jest.mock('../models/user');

describe('AuthService', () => {
  const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' };

  describe('signUp', () => {
    it('should create a new user and return a token', async () => {
      (hash as jest.Mock).mockResolvedValue('hashedpassword');
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      (sign as jest.Mock).mockReturnValue('token');

      const result = await authService.signUp('test@example.com', 'password');

      expect(result).toEqual({ user: { id: 1, email: 'test@example.com' }, token: 'token' });
      expect(User.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'hashedpassword' });
      expect(sign).toHaveBeenCalledWith({ userId: mockUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });
  });

  describe('logIn', () => {
    it('should return a user and token for valid credentials', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (verify as jest.Mock).mockResolvedValue(true);
      (sign as jest.Mock).mockReturnValue('token');

      const result = await authService.logIn('test@example.com', 'password');

      expect(result).toEqual({ user: { id: 1, email: 'test@example.com' }, token: 'token' });
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(verify).toHaveBeenCalledWith('hashedpassword', 'password');
      expect(sign).toHaveBeenCalledWith({ userId: mockUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should throw an error for invalid email', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authService.logIn('test@example.com', 'password')).rejects.toThrow('User not found');
    });

    it('should throw an error for invalid password', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (verify as jest.Mock).mockResolvedValue(false);

      await expect(authService.logIn('test@example.com', 'password')).rejects.toThrow('Invalid password');
    });
  });
});
