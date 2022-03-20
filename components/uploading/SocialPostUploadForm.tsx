import { useState } from 'react';
import tw, { styled } from 'twin.macro';

const Title = styled.h1`
  ${tw`text-2xl flex justify-center items-center p-1`}
`;

const FormContainer = styled.div``;

const ImageUpload = styled.div``;

const Form = styled.div``;

function SocialPostUploadForm() {
  return (
    <div>
      <Title>Upload Social Post</Title>
      <FormContainer>
        <ImageUpload></ImageUpload>
        <Form></Form>
      </FormContainer>
    </div>
  );
}

export default SocialPostUploadForm;
