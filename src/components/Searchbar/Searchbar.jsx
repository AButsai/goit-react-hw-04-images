import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

const Searchbar = props => {
  const { onSubmit } = props;

  const [tag, setTag] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;

    setTag(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (tag.trim() === '') {
      toast('Enter image name');
      return;
    }

    onSubmit(tag);
    setTag('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={tag}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
