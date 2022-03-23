import { useState } from 'react';
import Modal from 'components/popups/Modal';
import ChooseUploadType from 'components/popups/ChooseUploadType';

function ChooseSocialWork() {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="App">
      <Modal open={isOpen} onClose={closeModal}>
        <ChooseUploadType />
      </Modal>
    </div>
  );
}

export default ChooseSocialWork;
