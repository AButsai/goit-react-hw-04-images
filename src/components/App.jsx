import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../services/images-api.js';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import s from './App.module.css';

const App = () => {
  const [dataImages, setDataImages] = useState([]);
  const [imagesTag, setImagesTag] = useState('');
  const [page, setPage] = useState(1);

  const upDadeDataImages = data => {
    setDataImages([...dataImages, data]);
  };

  useEffect(() => {
    if (imagesTag === '') {
      return;
    }

    api
      .fetchImages(imagesTag, page)
      .then(response => {
        if (response.data.total !== 0) {
          return response.data;
        }
        return Promise.reject(
          new Error(`Нет картинок с названием ${imagesTag}`)
        );
      })
      .then(data => upDadeDataImages(data))
      .catch(error => {
        toast.error(error.message);
      });
  }, [imagesTag, page]);

  const handleSubmitForm = imagesTag => {
    setImagesTag(imagesTag);
    setPage(1);
    setDataImages([]);
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSubmitForm} />
      {dataImages.length !== 0 && (
        <ImageGallery images={dataImages} onClickButton={handleButtonClick} />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default App;
