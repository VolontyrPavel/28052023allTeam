import { UnsplashAPI } from './UnsplashAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import createGalleryCard from '../templates/gallery-card.hbs';
import onCheckboxClick from './is-change-them';

const unsplashApi = new UnsplashAPI(12);

const galleryEl = document.querySelector('.js-gallery');
const formEl = document.querySelector('.js-search-form');
const containerEl = document.querySelector('#tui-pagination-container');
const checkBoxEl = document.querySelector('#theme-switch-toggle');

const options = {
  totalItems: 0,
  itemsPerPage: unsplashApi.per_page,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(containerEl, options);

pagination.on('afterMove', createPopularPagination);
formEl.addEventListener('submit', onSearchSubmit);
checkBoxEl.addEventListener('change', onCheckboxClick);

const page = pagination.getCurrentPage();

async function onRenderPage(page = 1) {
  try {
    const resp = await unsplashApi.getPopularPhotos(page);
    // console.log(resp);
    galleryEl.innerHTML = createGalleryCard(resp.data.results);
    pagination.reset(resp.data.total);
    containerEl.classList.remove('is-hidden');

    if (resp.data.results.length === 0) {
      galleryEl.innerHTML = '';
      containerEl.classList.add('is-hidden');
      console.error('Server ERROR!!!');
      return;
    }

    if (resp.data.total <= unsplashApi.per_page) {
      containerEl.classList.add('is-hidden');
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

async function createPopularPagination(evt) {
  const currentPage = evt.page;

  try {
    const resp = await unsplashApi.getPopularPhotos(currentPage);

    galleryEl.innerHTML = createGalleryCard(resp.data.results);
  } catch (err) {
    console.log(err);
  }
}

onRenderPage();

// Логіка для пошуку по формі

async function onSearchSubmit(evt) {
  evt.preventDefault();
  const searchQuerry =
    evt.currentTarget.elements['user-search-query'].value.trim();

  if (!searchQuerry) {
    console.error("Search querry can't be empty");
    return;
  }

  pagination.off('afterMove', createPopularPagination);
  unsplashApi.query = searchQuerry;
  try {
    const resp = await unsplashApi.getPhotosByQuerry(page);

    galleryEl.innerHTML = createGalleryCard(resp.data.results);
    pagination.reset(resp.data.total);
    containerEl.classList.remove('is-hidden');

    if (resp.data.results.length === 0) {
      galleryEl.innerHTML = '';
      containerEl.classList.add('is-hidden');
      console.error('Server ERROR!!!');
      return;
    }

    if (resp.data.total <= unsplashApi.per_page) {
      containerEl.classList.add('is-hidden');
      return;
    }
    pagination.on('afterMove', createPaginationByQuerry);
  } catch (err) {
    console.log(err);
  }
}

async function createPaginationByQuerry(evt) {
  const currentPage = evt.page;

  try {
    const resp = await unsplashApi.getPhotosByQuerry(currentPage);

    galleryEl.innerHTML = createGalleryCard(resp.data.results);
  } catch (err) {
    console.log(err);
  }
}
