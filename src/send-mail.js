import 'dotenv/config';
import { send } from "./services/emailService.js";

send({
  email: 'hapipen561@inkiny.com',
  subject: 'Test',
  html: '123',
})