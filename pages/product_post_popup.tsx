import { useState } from 'react';
import PostDetails from 'components/post_popup/PostDetails';

const App = () => {
  return (
    <div className="App">
      <PostDetails
        imgs={['/assets/images/jammer.jpg']}
        type="complete"
        comments={[]}
        onClose={() => 0}
      />
    </div>
  );
};

export default App;
