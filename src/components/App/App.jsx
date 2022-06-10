import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import api from '../../services/imagesApi.js';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';

import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [dataImages, setDataImages] = useState([]);
  const [imagesName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (imagesName === '') {
      return;
    }

    setStatus(Status.PENDING);

    api
      .fetchImages(imagesName, page)
      .then(data => {
        setDataImages(prevState => [...prevState, data]);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setErrors(error);
        setStatus(Status.REJECTED);
      });
  }, [imagesName, page]);

  const handleSubmitForm = imagesName => {
    setImagesName(imagesName);
    setPage(1);
    setDataImages([]);
    setErrors(null);
  };

  const handleButtonClick = e => {
    setPage(prevState => prevState + 1);
  };

  const searchBar = <Searchbar onSubmit={handleSubmitForm} />;
  const toastContainer = <ToastContainer autoClose={1500} />;

  return (
    <>
      {status === Status.IDLE && (
        <div className={s.App}>
          {searchBar}
          {toastContainer}
        </div>
      )}

      {status === Status.PENDING && (
        <div className={s.App}>
          {searchBar}
          {toastContainer}
          {dataImages.length !== 0 && <ImageGallery images={dataImages} />}
          <Loader />
        </div>
      )}

      {status === Status.RESOLVED && (
        <div className={s.App}>
          {searchBar}
          {toastContainer}
          <ImageGallery images={dataImages}>
            <Button onClick={handleButtonClick} />
          </ImageGallery>
        </div>
      )}

      {status === Status.REJECTED && (
        <div className={s.App}>
          {searchBar}
          {toastContainer}
          {errors && (
            <p className={s.ErrorTitle}>
              Нет картинок с названием <span>{errors.message}</span>, поробуйте
              ввести другое название!
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default App;
