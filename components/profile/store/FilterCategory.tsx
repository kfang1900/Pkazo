import { useState } from 'react';
import 'twin.macro';
import DoubleSlider from './DoubleSlider';

const FilterCategory = ({
  title,
  values,
  unique,
  isPrice,
}: {
  title: string;
  values: string[];
  unique?: boolean;
  isPrice?: boolean;
}) => {
  const canShowMore = values.length >= 7;
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <div tw="font-bold text-[20px] text-[#3C3C3C]">{title}</div>
      <div tw="mt-4 flex flex-col gap-y-[10px]">
        {(!canShowMore || showMore ? values : values.slice(0, 5)).map(
          (item, i) => (
            <div key={i}>
              <div className="check-group" tw="flex items-center">
                <input
                  type={unique ? 'radio' : 'checkbox'}
                  id={`refinement-check-${title}-${item}`}
                  name={`refinement-check-${title}`}
                  tw="w-4 h-4"
                  css={{ 'accent-color': '#E24E4D' }}
                  defaultChecked={unique && !i}
                />
                <label
                  htmlFor={`refinement-check-${title}-${item}`}
                  className="check-label"
                  tw="ml-3 font-semibold text-[14px] text-[#5A5A5A]"
                >
                  {item}
                </label>
              </div>
            </div>
          )
        )}
        {canShowMore && (
          <div
            tw="font-bold text-[14px] text-[#5A5A5A] cursor-pointer"
            onClick={() => setShowMore((x) => !x)}
          >
            {showMore ? 'show less' : 'show more'}
          </div>
        )}
        {isPrice && <DoubleSlider />}
      </div>
    </div>
  );
};

export default FilterCategory;
