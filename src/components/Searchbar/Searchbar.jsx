import React, { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchImage, setSearchImage] = useState('');

  const handleImageChange = event => {
    setSearchImage(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchImage.trim() === '') {
      return alert('Please, enter image name.');
    }

    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <header className={style.Searchbar}>
      <h1 className="visually-hidden">images gallery</h1>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <label htmlFor="searchInput"></label>
        <input
          id="searchInput"
          type="text"
          name="image"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImage}
          className={style.SearchForm__input}
          onChange={handleImageChange}
        />
        <button type="submit" className={style.SearchForm__button}>
          <FcSearch size={30} />
          <span className={style.SearchForm__buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
