import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
export async function getImagesByQuery(query, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '51904026-11e1c7708336e49fc55c25133',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    iziToast.error({
      position: 'center',
      message: err.message,
    });
    return [];
  }
}
