import 'dotenv/config';
import { send } from './services/emailService.js';

send({
  email: 'difida1416@aaorsi.com',
  subject: 'Test',
  html: '1234',
})