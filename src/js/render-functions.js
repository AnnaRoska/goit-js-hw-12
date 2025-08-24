import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const btnMore = document.querySelector('.btn-more');
let lightbox = null;

export function createGallery(images) {
  if (!images || images.length === 0) return;
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
        <li class="photo-card">
          <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="info">
            <ul class="ul-info">
            <li>Likes</li>
            <li>${likes}</li>
            </ul>
            <ul class="ul-info">
            <li>Views</li>
            <li>${views}</li>
            </ul>
            <ul class="ul-info">
            <li>Comments</li>
            <li>${comments}</li>
            </ul>
            <ul class="ul-info">
            <li>Downloads</li>
            <li>${downloads}</li>
            </ul>
          </div>
        </li>
         `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoadMoreButton() {
  btnMore.classList.remove('hidden');
}
export function hideLoadMoreButton() {
  btnMore.classList.add('hidden');
}
