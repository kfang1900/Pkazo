import { useEffect, useState, useRef } from 'react';
import tw, { TwStyle } from 'twin.macro';

interface ShowMoreProps {
    children: any;
    appearance?: TwStyle;
    moreStyle?: TwStyle;
    height: number;
    fixed?: boolean;
}
const ShowMore = (props: ShowMoreProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hasMore, setHasMore] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const handleResize = () => {
        if (ref.current && ref.current['scrollHeight'] > props.height) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
    });
    useEffect(handleResize, [ref, props.height]);
    return (
        <div tw="relative" css={[props.appearance]}>
            <div
                ref={ref}
                css={[showMore ? tw`overflow-auto` : tw`overflow-hidden`]}
                style={{
                    ...(showMore ? { height: 'auto' } : { maxHeight: `${props.height}px` }),
                    ...(!showMore && props.fixed && { height: `${props.height}px` })
                }}
            >
                {props.children}
            </div>
            {
                hasMore && <div
                    css={[
                        showMore ? tw`justify-end` : tw`absolute right-0 bottom-0`,
                        tw`flex`,
                        props.moreStyle
                    ]}
                >
                    {!showMore && <>
                        <div tw='w-[2em] bg-gradient-to-l from-white' />
                        <div tw='bg-white px-1 tracking-widest'>{' ... '}</div>
                    </>}
                    <div tw='underline cursor-pointer bg-white' onClick={() => setShowMore(!showMore)}>
                        See {showMore ? 'less' : 'more'}
                    </div>
                </div>
            }
        </div >
    );
};
export default ShowMore;
