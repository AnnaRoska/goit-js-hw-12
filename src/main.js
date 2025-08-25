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
let countPerPage = 15;
let countLoad = 0;
let query = '';
let totalHits;
const inputImg = document.querySelector('[name="search-text"]');
const frmImg = document.querySelector('.form');
const btnMore = document.querySelector('.btn-more');

frmImg.addEventListener('submit', async e => {
  e.preventDefault();
  currentPage = 1;
  countLoad = 0;
  countPerPage = 15;
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
    const dataImg = await getImagesByQuery(query, countPerPage, currentPage);
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
    countLoad = countLoad + countPerPage;

    if (countLoad < totalHits) {
      showLoadMoreButton();
    }
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
  currentPage += 1;
  hideLoadMoreButton();
  if (countLoad + countPerPage >= totalHits) {
    countPerPage = totalHits - countLoad;
  }
  showLoader();
  try {
    const dataImg = await getImagesByQuery(query, countPerPage, currentPage);

    const images = dataImg.hits;
    createGallery(images);
    if (!images || images.length === 0) {
      iziToast.warning({
        position: 'center',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    countLoad = countLoad + countPerPage;
    if (countLoad < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.warning({
        position: 'center',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    const img = document.querySelector('.photo-card');
    const cardHeight = img.getBoundingClientRect().height;

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
    frmImg.reset();
  }
});
