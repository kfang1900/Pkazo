import React from 'react';
import Header from '../components/uploading/Header';
import CompleteWorkPortfolio from '../components/uploading/CompleteWorkPortfolio';
import CompleteWorkTabSelector from '../components/uploading/CompleteWorkTabSelector.js';

const completepost = () => {
  return (
    <>
      <Header />

      <CompleteWorkTabSelector />

      <CompleteWorkPortfolio />
    </>
  );
};

export default completepost;
