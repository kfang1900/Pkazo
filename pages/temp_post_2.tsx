import { useState } from 'react';
import PostDetails from 'components/post_popup/PostDetails';

const App = () => {
  return (
    <div className="App">
      <PostDetails
        post={{
          imgs: [
            '/post_assets/wip/img1.png',
            '/post_assets/wip/img2.png',
            '/post_assets/wip/img3.png',
            '/post_assets/wip/img4.png',
            '/post_assets/wip/img5.png',
            '/post_assets/wip/img6.png',
            '/post_assets/wip/img7.png',
            '/post_assets/wip/img8.png',
            '/post_assets/wip/img9.png',
          ],
          type: 'wip',
          comments: [],
        }}
        onClose={() => 0}
      />
    </div>
  );
};

export default App;
