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
