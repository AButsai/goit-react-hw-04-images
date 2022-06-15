import React from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  handleToggleModal,
}) => {
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => handleToggleModal(largeImageURL, tags)}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
