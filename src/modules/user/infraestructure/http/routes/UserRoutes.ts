import express, { Router } from 'express';
import { UserUseCase } from '../../../application/useCases/UserUseCase';
import { UserController } from '../controllers/UserController';
import { MongoUserRepository } from '../../repositories/MongoUserRepository';

const router: Router = express.Router();
const blogRepository = new MongoUserRepository();
const blogUseCase = new UserUseCase(blogRepository);
const blogController = new UserController(blogUseCase);

router.post('/create', blogController.createAccount.bind(blogController));
router.post('/login', blogController.login.bind(blogController));

export default router;
