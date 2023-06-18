import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User.js';
import { emailService } from '../services/emailService.js';

async function register(req, res, next) {
  const { email, password } = req.body;

  const activationToken = uuidv4();
  const user = await User.create({ email, password, activationToken });

  await emailService.sendActivationLink(email, activationToken);

  res.send(`<h1>Check your email box to finish activation...</h1>`);
}

async function activate(req, res, next) {
  const { activationToken } = req.body;

  const user = await User.findOne({
    where: { activationToken }
  });

  if (!user) {
    res.sendStatus(404);
    return;
  }

  user.activationToken = null;
  await user.save();

  res.send(user);
}

export const authController = {
  register,
  activate,
};