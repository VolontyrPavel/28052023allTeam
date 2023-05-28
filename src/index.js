import { UnsplashAPI } from './js/UnsplashAPI'
const unsplashApi = new UnsplashAPI();

import createGalleryCard from './templates/gallery-card.hbs'

const galleryEl = document.querySelector('.js-gallery')

async function onRenderPage(page = 1) {
    try {
        const resp = await unsplashApi.getPopularPhotos(page);
        galleryEl.innerHTML = createGalleryCard(resp.data.results);
    }
    catch (err) {
        console.log(err);
    }
}

onRenderPage();

