import express, { Router } from 'express';
import { BlogUseCase } from '../../../application/useCases/BlogUseCase';
import { BlogController } from '../controllers/BlogController';
import { MongoBlogRepository } from '../../repositories/MongoBlogRepository';
import { authMiddleware } from '../../../../../middlewares/AuthMiddleware';

const router: Router = express.Router();

const blogRepository = new MongoBlogRepository();
const blogUseCase = new BlogUseCase(blogRepository);
const blogController = new BlogController(blogUseCase);

router.get('/', blogController.findAll.bind(blogController));
router.get('/:id', blogController.findById.bind(blogController));
router.post('/', authMiddleware, blogController.create.bind(blogController));
router.put('/:id', authMiddleware, blogController.update.bind(blogController));
router.delete('/:id', authMiddleware, blogController.delete.bind(blogController));

export default router;
