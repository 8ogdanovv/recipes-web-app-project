import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User.js';
import { emailService } from '../services/emailService.js';

async function register (req, res, next) {
  const { email, password } = req.body;

  const user = await User.create({ email, password });

  const actionToken = uuidv4();

  await emailService.sendActivationLink(email, actionToken);

  res.send(`<h1>Check your email box to finish activation...</h1>`);
}

export const authController = {
  register
};