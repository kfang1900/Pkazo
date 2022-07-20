import { useState, useRef } from 'react';
import tw from 'twin.macro';
import styles from 'styles/UploadWork.module.css';

const DoubleSlider = () => {
  const min = 0;
  const max = 9999;
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const progressRef = useRef(null);

  const inputStyle = tw`text-center w-[64px] h-9 rounded-[10px] border border-[#D8D8D8] appearance-none focus:outline-none text-[16px] text-[#5A5A5A] font-semibold`;

  return (
    <div>
      <input type="range" tw="w-full mt-3" />
      <div tw="mt-3 flex items-center justify-center w-full gap-x-5">
        <input
          type="number"
          css={[inputStyle]}
          className={styles['numberInput']}
          value={minValue}
          onChange={(e) => {
            let val = parseInt(e.target.value);
            while (val > max) val = Math.floor(val / 10);
            setMinValue(Math.max(min, val));
            e.target.value = minValue.toString();
          }}
          onBlur={() => {
            setMaxValue(Math.max(minValue, maxValue));
          }}
        />
        <div tw="text-[#808080]">to</div>
        <input
          type="number"
          css={[inputStyle]}
          className={styles['numberInput']}
          value={maxValue}
          onChange={(e) => {
            let val = parseInt(e.target.value);
            while (val > max) val = Math.floor(val / 10);
            setMaxValue(Math.max(min, val));
            e.target.value = maxValue.toString();
          }}
          onBlur={() => {
            setMinValue(Math.min(minValue, maxValue));
          }}
        />
      </div>
    </div>
  );
};

export default DoubleSlider;
