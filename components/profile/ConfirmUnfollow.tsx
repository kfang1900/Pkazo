import { useState } from 'react';
import buttons from '../../styles/Button';
import tw from 'twin.macro';

const ConfirmUnfollowModal = (props: any) => {
  console.log(props.showModal);
  return props.showModal ? (
    <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center">
      <div tw="w-[350px] rounded-3xl bg-white py-10 px-10">
        <h2 tw="text-2xl text-black font-bold">Unfollow James Jean?</h2>
        <div tw="mt-8 space-y-4">
          <button
            onClick={props.handleUnfollow}
            css={buttons.red}
            tw="duration-150 w-full"
          >
            Unfollow
          </button>
          <button
            onClick={() => props.setShowModal(false)}
            css={buttons.white}
            tw="duration-150 w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};
export default ConfirmUnfollowModal;
