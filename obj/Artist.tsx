import { Post } from './Post';
export type Artist = {
  name: string;
  pfp: string;
  cover: string;
  location: string;
  discipline: string;
  bio: string;
  posts: Post[];
  followers: Artist[];
  following: Artist[];
  education: { school: string; field?: string; start: number; end: number }[];
  experience: { company: string; role?: string; start: number; end: number }[];
  exhibitions: { place: string; start: number; end: number }[];
};
export type User = {
  name: string;
  pfp: string;
};
