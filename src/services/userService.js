import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from './emailService.js';
import { ApiError } from "../exceptions/ApiError.js";
import { User } from "../models/User.js";

function getAllActive() {
  return User.findAll({
    where: { activationToken: null },
  });
}

function getByEmail(email) {
  return User.findOne({
    where: { email }
  })
}

function normalize({ id, email, name }) {
  return { id, email, name };
}

async function register({ email, password, name}) {
  const existingUser = getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('Validation error', {
      email: 'Email is already taken',
    });
  }

  const activationToken = uuidv4();
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email, 
    password: hash,
    name,
    activationToken
  });

  await emailService.sendActivationLink(email, activationToken);
}

export const userService = { getAllActive, normalize, getByEmail, register };