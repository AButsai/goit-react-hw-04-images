import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

import s from './ImageGallery.module.css';

const ImageGallery = props => {
  const { images, onClickButton, isButton } = props;

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    handleToggleLoader();
  }, [images]);

  function handleToggleLoader() {
    setShowLoader(!showLoader);
  }

  function handleClickButton() {
    handleToggleLoader();
    onClickButton();
  }

  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(({ hits }) =>
          hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))
        )}
      </ul>
      {showLoader ? (
        <Button isButton={isButton} onClick={handleClickButton} />
      ) : (
        <Loader />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGallery;