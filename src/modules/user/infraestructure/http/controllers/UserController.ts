import { Request, Response } from 'express';
import { User } from '../../../domain/models/User';
import { UserUseCase } from '../../../application/useCases/UserUseCase';
import { generateJWT } from '../../../../../utils/jwtUtils';
import { bcryptComparePassword, bcryptHashPassword } from '../../../../../utils/bcrypt';
import { statusErrors } from '../../../../../../src/constants/StatusCodeHTTP';
import { statusErrorMessages } from '../../../../../../src/constants/StatusErrorMessage';
import errorHandler from '../../../../../../src/utils/ErrorHandler';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[^\s]).{8,}$/;
    return passwordRegex.test(password);
  }
  async createAccount(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!this.validatePassword(password)) {
        res.status(400).json({ error: 'Not valid password' });
        return;
      }
      const encryptedPassword = await bcryptHashPassword(password);
      const newUser: User = { email, password: encryptedPassword };
      const createdUser = await this.userUseCase.createAccount(newUser);
      console.log({ createdUser });
      res.send(createdUser);
    } catch (error: any) {
      console.error('Error during login:', error);
      errorHandler(error, res);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await this.userUseCase.findUserByEmail(email);
      if (!user) {
        res.status(statusErrors.NOT_FOUND).json(statusErrorMessages.NOT_FOUND_ERROR);
        return;
      }
      const correctPassword = await bcryptComparePassword(password, user.password);

      if (!correctPassword) {
        res.status(statusErrors.FORBIDDEN).json({ error: statusErrorMessages.INCORRECT_PASSWORD });
        return;
      }

      const token = await generateJWT({ email: user.email });
      res.cookie('token', token, {
        secure: true,
        httpOnly: true,
      });
      res.json({ token });
    } catch (error: any) {
      res.status(statusErrors.INTERNAL_SERVER).json({ error: 'Internal Server Error' });
    }
  }
}
