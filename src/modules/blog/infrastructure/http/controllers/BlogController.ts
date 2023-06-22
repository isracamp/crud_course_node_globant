import { Request, Response } from 'express';
import { Blog } from '../../../domain/models/Blog';
import { BlogUseCase } from '../../../application/useCases/BlogUseCase';

export class BlogController {
  // dependency injection
  constructor(private blogUseCase: BlogUseCase) {}

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await this.blogUseCase.getAll();
      res.send(blogs);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const entry = await this.blogUseCase.getById(id);
      if (!entry) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.send(entry);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const { title, content } = req.body;
    try {
      const newBlog: Blog = { title, content };
      const createdBlog = await this.blogUseCase.create(newBlog);
      res.status(201).json(createdBlog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { title, content } = req.body;
    try {
      const updatedBlog = await this.blogUseCase.update(id, { title, content });
      if (!updatedBlog) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.send(updatedBlog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await this.blogUseCase.delete(id);
      res.send({ ok: true, message: `${id} deleted correctly` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}
