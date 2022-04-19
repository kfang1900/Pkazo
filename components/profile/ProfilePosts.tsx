import { useState } from 'react';
import Image from 'next/image';
import 'twin.macro';
import PostDetails, { PostDetailsProps } from 'components/popups/PostDetails';
import 'utils/Sample_Posts_Imports';
import { sample_posts } from 'utils/Sample_Posts_Imports';

function PostObject(props: PostDetailsProps) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      {showPopup && (
        <PostDetails post={props.post} onClose={() => setShowPopup(false)} />
      )}
      <button
        tw="transform w-full"
        css={{ aspectRatio: '1/1' }}
        onClick={() => setShowPopup(true)}
      >
        <Image
          src={props.post.imgs[0]}
          layout="fill"
          alt="Image Alt"
          objectFit="cover"
        />
      </button>
    </>
  );
}

function ProfilePosts() {
  return (
    <div tw="mb-10 mx-[5%]">
      <div tw="grid gap-6 lg:gap-10 sm:grid-cols-2 sm:w-[595px] lg:w-[915px] 2xl:w-[1235px] lg:grid-cols-3 2xl:grid-cols-4 mx-auto items-center">
        {/* Single Portfolio */}
        {sample_posts.map((post, idx) => (
          <PostObject key={idx} post={post} onClose={() => 0} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePosts;
