import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import Wrapper from 'components/wrapper/Wrapper.js';
import Image from 'next/image';
import CompleteWorkInfo from './CompleteWorkInfo';
import Header from './Header.tsx';
import CompleteWorkTabSelector from './CompleteWorkTabSelector';
import CompleteWorkPosts from './CompleteWorkPosts';
import CompleteWorkPortfolio from './CompleteWorkPortfolio';

function CompleteWorkUploadForm(props) {
  const [stage, setStage] = useState(0);

  return (
    <>
      <Header />
      <CompleteWorkTabSelector stage={stage} setStage={setStage} />
      {stage === 0 && <CompleteWorkInfo />}
      {stage === 1 && <CompleteWorkPosts />}
      {stage === 2 && <CompleteWorkPortfolio />}
    </>
  );
}

export default CompleteWorkUploadForm;
