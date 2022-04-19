import { Artist } from './Artist';
import { Comment } from './Comment';
export type CompleteInfo = {
  type: 'complete';
  media: string;
  price: number;
};
export type WipInfo = {
  type: 'wip';
  workTitle: string;
  media: string;
  releaseDate: string;
  tags: string[];
};
export type SocialInfo = { type: 'social'; tags: string[] };
export type Post = {
  user: Artist;
  imgs: string[];
  comments: Comment[];
  title: string;
  desc: string;
  info: CompleteInfo | WipInfo | SocialInfo;
};
