import { Post } from './Post';
import tw, { styled } from 'twin.macro';
export type Education = {
  School: string;
  Field: string;
  Start: number;
  End: number;
};
export type Experience = {
  Company: string;
  Position: string;
  Start: number;
  End: number;
};
export type Exhibition = { Gallery: string; Year: number };
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
        {x.Field !== undefined && <span tw="font-semibold">{x.Field}</span>} at{' '}
        <span tw="font-semibold">{x.School}</span>
      </div>
      <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
        {x.Start}
        {x.Start !== x.End && '-' + x.End}
      </div>
    </>
  );
};
export const showExp = (x: Experience) => {
  return (
    <>
      <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
        {x.Position !== undefined && (
          <>
            {x.Position} <span tw="font-normal"> at </span>
          </>
        )}
        {x.Company}
      </div>
      <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
        {x.Start}
        {x.Start !== x.End && '-' + x.End}
      </div>
    </>
  );
};
export const showExh = (x: Exhibition) => {
  return (
    <>
      <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
        {x.Gallery}
      </div>
      <div tw="text-[16px] text-[#8B8B8B] leading-[24px]">
        {x.Year}
      </div>
    </>
  );
};
export type User = {
  name: string;
  pfp: string;
};
