import { hash, verify} from 'argon2';
import { sign } from 'jsonwebtoken';
import User from '../models/user';

export const signUp = async (email: string, password: string) => {
  const hashedPassword = await hash(password);
  const user = await User.create({ email, password: hashedPassword });
  const token = sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return { user: { id: user.id, email: user.email }, token };
};

export const logIn = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await verify(user.password, password);
  if (!isPasswordValid) throw new Error('Invalid password');

  const token = sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return { user: { id: user.id, email: user.email }, token };
};
