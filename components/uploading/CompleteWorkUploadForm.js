import { useState } from 'react';
import CompleteWorkInfo from './CompleteWorkInfo';
import Header from '../Header.tsx';
import CompleteWorkTabSelector from './CompleteWorkTabSelector';
import CompleteWorkPosts from './CompleteWorkPosts';
import CompleteWorkPortfolio from './CompleteWorkPortfolio';



function CompleteWorkUploadForm() {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState({})

  const uploadData=async(s)=>{
    console.log("uploading",s)
  }
  const getData=()=>{
    return data
  }
  const functions={setStage,setData,uploadData,getData}

  return (
    <>
      <Header />
      <CompleteWorkTabSelector stage={stage} setStage={setStage} />
      {stage === 0 && <CompleteWorkInfo {...functions} />}
      {stage === 1 && <CompleteWorkPosts {...functions} />}
      {stage === 2 && <CompleteWorkPortfolio />}
    </>
  );
}

export default CompleteWorkUploadForm;
