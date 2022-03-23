import { useState } from 'react';
import CompleteWorkInfo from './CompleteWorkInfo';
import Header from '../Header.tsx';
import CompleteWorkTabSelector from './CompleteWorkTabSelector';
import CompleteWorkPosts from './CompleteWorkPosts';
import CompleteWorkPortfolio from './CompleteWorkPortfolio';

function CompleteWorkUploadForm() {
  const [stage, setStage] = useState(0);

  return (
    <>
      <Header />
      <CompleteWorkTabSelector stage={stage} setStage={setStage} />
      {stage === 0 && <CompleteWorkInfo goNext={() => setStage(1)} />}
      {stage === 1 && <CompleteWorkPosts goNext={() => setStage(2)} />}
      {stage === 2 && <CompleteWorkPortfolio />}
    </>
  );
}

export default CompleteWorkUploadForm;
