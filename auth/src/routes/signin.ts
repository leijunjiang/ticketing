import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password'
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => { 
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(`existingUser = ${existingUser}`)
    if (!existingUser) {
      throw new BadRequestError('Invalide credential');
    }
    console.log('after exiting user')
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    console.log('after passwordsmatch')
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credential');
    }
    console.log('before user jwt')
    // generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      }, 
      process.env.JWT_KEY!
    );

    // store it on session object
    req.session = {
      jwt: userJwt
    }
    console.log('after user jwt')
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
