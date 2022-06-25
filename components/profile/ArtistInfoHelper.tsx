import tw, { styled } from 'twin.macro';

export const showEdu = (x: {
    school: string;
    field?: string;
    start: number;
    end?: number;
}) => {
    return (
        <>
            <div tw="text-[14px] md:text-[16px] text-[#3C3C3C] leading-[24px]">
                Studied{' '}
                {x.field !== undefined && <span tw="font-semibold">{x.field}</span>} at{' '}
                <span tw="font-semibold">{x.school}</span>
            </div>
            <div tw="text-[14px] md:text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
                {x.start}
                {x.end && x.start !== x.end && ' - ' + x.end}
            </div>
        </>
    );
};
export const showExp = (x: {
    company: string;
    position?: string;
    start: number;
    end?: number;
}) => {
    return (
        <>
            <div tw="text-[14px] md:text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
                {x.position !== undefined && (
                    <>
                        {x.position} <span tw="font-normal"> at </span>
                    </>
                )}
                {x.company}
            </div>
            <div tw="text-[14px] md:text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
                {x.start}
                {x.end && x.start !== x.end && ' - ' + x.end}
            </div>
        </>
    );
};
export const showExh = (x: { gallery: string; year: number }) => {
    return (
        <>
            <div tw="text-[14px] md:text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
                {x.gallery}
            </div>
            <div tw="text-[14px] md:text-[16px] text-[#8B8B8B] leading-[24px]">
                {x.year}
                {/* {x.end && x.start !== x.end && '-' + x.end} */}
            </div>
        </>
    );
};