import { Artist, User } from './Artist';
export type Comment = {
  user: Artist | User;
  time: number;
  comment: string;
};
