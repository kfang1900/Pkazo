import { useState } from 'react';
import tw, { styled } from 'twin.macro';

const Title = styled.h1`
  ${tw`text-2xl flex justify-center items-center h-screen`}
`;

function SocialPostUploadForm(props) {
  return (
    <div>
      <Title>Upload Social Post</Title>
    </div>
  );
}

export default SocialPostUploadForm;
