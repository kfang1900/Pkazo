import { useState } from 'react';
import PostDetails from 'components/post_popup/PostDetails';

const App = () => {
  return (
    <div className="App">
      <PostDetails
        post={{
          imgs: ['/post_assets/social.png'],
          type: 'social',
          comments: [],
        }}
        onClose={() => 0}
      />
    </div>
  );
};

export default App;
