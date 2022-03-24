import { NextPage } from 'next';
import { useState } from 'react';
import Modal from 'components/popups/Modal';
import SocialPostUploadForm from 'components/uploading/SocialPostUploadForm';
import { FileUploader } from 'react-drag-drop-files';

const UploadSocialPost: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <Modal open={isOpen} onClose={closeModal}>
        <SocialPostUploadForm />
      </Modal>
    </div>
  );
};

export default UploadSocialPost;
