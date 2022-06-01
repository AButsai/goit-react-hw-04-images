import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../services/images-api.js';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { PER_PAGE } from '../services/images-api.js';

import s from './App.module.css';

const App = () => {
  const [dataImages, setDataImages] = useState([]);
  const [imagesTag, setImagesTag] = useState('');
  const [page, setPage] = useState(1);
  const [isButton, setIsButton] = useState(true);

  useEffect(() => {
    if (imagesTag === '') {
      return;
    }

    api
      .fetchImages(imagesTag, page)
      .then(response => {
        if (dataImages.length * PER_PAGE > response.data.totalHits) {
          setIsButton(false);
        }
        if (response.data.total !== 0) {
          return response.data;
        }
        return Promise.reject(
          new Error(`Нет картинок с названием ${imagesTag}`)
        );
      })
      .then(data => setDataImages([...dataImages, data]))
      .catch(error => {
        toast.error(error.message);
      });
  }, [imagesTag, page]);

  const handleSubmitForm = imagesTag => {
    setImagesTag(imagesTag);
    setPage(1);
    setDataImages([]);
    setIsButton(true);
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSubmitForm} />
      {dataImages.length !== 0 && (
        <ImageGallery
          images={dataImages}
          onClickButton={handleButtonClick}
          isButton={isButton}
        />
      )}

      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default App;
