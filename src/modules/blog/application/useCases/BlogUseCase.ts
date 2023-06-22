import { Blog } from '../../domain/models/Blog';
import { BlogRepository } from '../../domain/ports/BlogRepository';

export class BlogUseCase {
  // add dependency injection
  constructor(private blogRepository: BlogRepository) {}

  // CRUD OPERATIONS INTERFACE
  async getAll(): Promise<Blog[]> {
    return this.blogRepository.findAll();
  }

  async getById(_id: string): Promise<Blog> {
    return this.blogRepository.findById(_id);
  }
  async create(blog: Blog): Promise<Blog> {
    return this.blogRepository.createNewEntry(blog);
  }
  async update(_id: string, body: { title: string; content: string }): Promise<Blog | null> {
    return this.blogRepository.updateEntry(_id, body);
  }
  async delete(_id: string): Promise<void | { status: string; message: string }> {
    return this.blogRepository.removeEntry(_id);
  }
}
