
import fetchPictures from 'components/API/pixabayImages-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import style from './Searchbar/Searchbar.module.css';
import React, { useState, useEffect } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [modalImage, setModalImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    const fetchImageData = async () => {
      setStatus(Status.PENDING);
      try {
        const fetchedImages = await fetchPictures(imageName, page);
        if (fetchedImages.hits.length < 1) {
          setShowButton(false);
          setStatus(Status.IDLE);
          alert('No images on your query');
          return;
        }
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setStatus(Status.RESOLVED);
        setShowButton(page < Math.ceil(fetchedImages.total / 12));
      } catch (error) {
        console.error('Error during data fetching', error);
        setStatus(Status.REJECTED);
      }
    };

    fetchImageData();
  }, [imageName, page]);

  const handleFormSubmit = newName => {
    if (newName === imageName) {
      return;
    }
    setImageName(newName);
    setPage(1);
    setImages([]);
    setShowButton(false);
    setShowModal(false);
    setStatus(Status.IDLE);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalImage = event => {
    setModalImage(event);
  };

  const handleModalAlt = event => {
    setImageAlt(event);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === Status.IDLE && (
        <h2 className={style.EmptySearch}>Search something!</h2>
      )}

      {status === Status.PENDING && <Loader />}

      {images.length > 0 && (
        <ImageGallery
          showModal={toggleModal}
          images={images}
          handleModalImage={handleModalImage}
          handleModalAlt={handleModalAlt}
        />
      )}

      {showButton && <Button onClick={loadMoreImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={imageAlt} />
        </Modal>
      )}
    </>
  );
};

export default App;
