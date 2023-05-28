// https://unsplash.com/documentation#search-photos - API
// https://www.npmjs.com/package/tui-pagination - Бібліотека "tui-pagination"

import axios from 'axios';

export class UnsplashAPI {
  constructor(perPage = 12) {
    this.per_page = perPage;
  }
  #BASE_URL = 'https://api.unsplash.com';
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';

  getPopularPhotos(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        query: 'random',
        page,
        per_page: this.per_page,
        client_id: this.#API_KEY,
      },
    });
  }

  getPhotosByQuerry(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        query: this.#query,
        page,
        per_page: this.per_page,
        client_id: this.#API_KEY,
      },
    });
  }

  get query() {
    this.#query;
  }

  set query(newQuerry) {
    this.#query = newQuerry;
  }
}
