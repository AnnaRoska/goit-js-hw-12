import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
let currentPage = 1;
let query = '';
const inputImg = document.querySelector('[name="search-text"]');
const frmImg = document.querySelector('.form');
const btnMore = document.querySelector('.btn-more');

let totalHits;
frmImg.addEventListener('submit', async e => {
  e.preventDefault();
  query = inputImg.value.trim();
  if (query.length === 0) {
    iziToast.error({
      position: 'center',
      message: '❌ Fill in the search field',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const dataImg = await getImagesByQuery(query, 1);
    const images = dataImg.hits;
    totalHits = dataImg.totalHits;
    createGallery(images);

    if (!images || images.length === 0) {
      iziToast.warning({
        position: 'center',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    showLoadMoreButton();
  } catch (err) {
    iziToast.error({
      position: 'center',
      message: err.message,
    });
  } finally {
    hideLoader();

    frmImg.reset();
  }
});

btnMore.addEventListener('click', async () => {
  hideLoadMoreButton();
  showLoader();
  try {
    const dataImg = await getImagesByQuery(query, (currentPage += 1));
    const images = dataImg.hits;
    totalHits = dataImg.totalHits;
    if (currentPage * 15 > totalHits) {
      iziToast.warning({
        position: 'center',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    createGallery(images);
    if (!images || images.length === 0) {
      iziToast.warning({
        position: 'center',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    const img = document.querySelector('.photo-card');
    const cardHeight = img.getBoundingClientRect().height;
    console.log('Висота картки:', cardHeight);

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    iziToast.error({
      position: 'center',
      message: err.message,
    });
  } finally {
    hideLoader();
    showLoadMoreButton();
    frmImg.reset();
  }
});
