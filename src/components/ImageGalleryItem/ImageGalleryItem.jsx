import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { webformatURL, largeImageURL, tags } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={handleToggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
