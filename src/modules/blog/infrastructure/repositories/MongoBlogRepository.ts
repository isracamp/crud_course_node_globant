/* eslint-disable @typescript-eslint/no-explicit-any */

import { BlogSchemaModel } from '../schema/BlogSchema';

import { Blog } from '../../domain/models/Blog';
import { BlogRepository } from '../../domain/ports/BlogRepository';

export class MongoBlogRepository implements BlogRepository {
  async findAll(): Promise<Blog[]> {
    return BlogSchemaModel.find().exec();
  }

  async findById(_id: string): Promise<Blog> {
    return BlogSchemaModel.findById(_id).exec() as unknown as Blog;
  }
  createNewEntry(newEntry: Blog): Promise<Blog> {
    return BlogSchemaModel.create(newEntry);
  }
  updateEntry(_id: string, body: { title: string; content: string }): Promise<Blog | null> {
    return BlogSchemaModel.findByIdAndUpdate(_id, body).exec();
  }
  removeEntry(_id: string): Promise<void | { status: string; message: string } | any> {
    return BlogSchemaModel.findByIdAndRemove(_id).exec();
  }
}
