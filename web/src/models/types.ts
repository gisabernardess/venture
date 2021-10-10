import { UserRole } from './enums';

export type User = {
  id: number;
  avatarUrl: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  updatedAt: string;
  user: Pick<User, 'name'>;
  comments: Comment[];
};

export type Comment = {
  id: number;
  text: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
};

export type Pagination = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url?: string;
  previous_page_url?: string;
};
