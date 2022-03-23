import { useState } from 'react';
import PostDetails from 'components/post_popup/PostDetails';

const App = () => {
  return (
    <div className="App">
      <PostDetails
        imgs={['/post_assets/social.png']}
        type="social"
        comments={[]}
      />
    </div>
  );
};

export default App;
