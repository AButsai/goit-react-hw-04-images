import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

import s from './ImageGallery.module.css';

const ImageGallery = ({ images, children, handleToggleModal }) => {
  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(images =>
          images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              handleToggleModal={handleToggleModal}
            />
          ))
        )}
      </ul>
      {children}
    </>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.element,
  hits: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGallery;
