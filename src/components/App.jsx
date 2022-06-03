import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../services/images-api.js';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import s from './App.module.css';

const App = () => {
  const [dataImages, setDataImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query === '') {
      return;
    }

    api
      .fetchImages(query, page)
      .then(data => {
        setDataImages(() => {
          return [...dataImages, data];
        });
      })
      .catch(error => {
        toast.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const handleSubmitForm = query => {
    setQuery(query);
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
