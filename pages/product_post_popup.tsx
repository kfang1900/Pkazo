import { useState } from 'react';
import Modal from 'components/post_popup/Modal';
import PostDetails from 'components/post_popup/PostDetails';

const App = () => {
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
        <PostDetails />
      </Modal>
    </div>
  );
};

export default App;
