import { Blog } from '../models/Blog';

export interface BlogRepository {
  findAll: () => Promise<Blog[]>;
  findById: (_id: string) => Promise<Blog>;
  createNewEntry: (newEntry: Blog) => Promise<Blog>;
  updateEntry: (_id: string, body: { title: string; content: string }) => Promise<Blog | null>;
  removeEntry: (_id: string) => Promise<void | { status: string; message: string }>;
}
