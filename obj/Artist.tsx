import { Post } from './Post';
import tw, { styled } from 'twin.macro';
export type Education = {
  school: string;
  field?: string;
  start: number;
  end: number;
};
export type Experience = {
  company: string;
  role?: string;
  start: number;
  end: number;
};
export type Exhibition = { place: string; start: number; end: number };
export type Artist = {
  username: string;
  name: string;
  pfp: string;
  cover: string;
  location: string;
  discipline: string;
  bio: string;
  posts: Post[];
  followers: Artist[];
  following: Artist[];
  education: Education[];
  experience: Experience[];
  exhibitions: Exhibition[];
};
export const showEdu = (x: Education) => {
  return (
    <>
      <div tw="text-[16px] text-[#3C3C3C] leading-[24px]">
        Studied{' '}
        {x.field !== undefined && <span tw="font-semibold">{x.field}</span>} at{' '}
        <span tw="font-semibold">{x.school}</span>
      </div>
      <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
        {x.start}
        {x.start !== x.end && '-' + x.end}
      </div>
    </>
  );
};
export const showExp = (x: Experience) => {
  return (
    <>
      <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
        {x.role !== undefined && (
          <>
            {x.role} <span tw="font-normal"> at </span>
          </>
        )}
        {x.company}
      </div>
      <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
        {x.start}
        {x.start !== x.end && '-' + x.end}
      </div>
    </>
  );
};
export const showExh = (x: Exhibition) => {
  return (
    <>
      <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
        {x.place}
      </div>
      <div tw="text-[16px] text-[#8B8B8B] leading-[24px]">
        {x.start}
        {x.start !== x.end && '-' + x.end}
      </div>
    </>
  );
};
export type User = {
  name: string;
  pfp: string;
};
