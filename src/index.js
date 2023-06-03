
import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = form.querySelector('.form-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const API_KEY = '36775018-abad017b89dacc6f8ffcc7875';

const PER_PAGE = 40;
let currentSearchQuery = '';
let currentPage = 1;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', searchImages);
loadMoreBtn.addEventListener('click', fetchNextPage);

async function searchImages(event) {
  event.preventDefault();
  currentSearchQuery = input.value.trim();
  currentPage = 1;

  if (currentSearchQuery === '') {
    Notiflix.Notify.failure('Enter a search word!');
    return;
  }

  Notiflix.Notify.info('Images are fetching. Please wait.');
  gallery.innerHTML = '';


  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${currentSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${currentPage}`
    );

    if (data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      const images = data.hits
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => {
            return `
            <div>
              <img src="${webformatURL}" alt="${tags}" />
              <p>
                Likes: ${likes}<br>
                Views: ${views}<br>
                Comments: ${comments}<br>
                Downloads: ${downloads}
              </p>
            </div>
          `;
          }
        )
        .join('');

      gallery.innerHTML = images;
      loadMoreBtn.style.display = 'inline';
      loadMoreBtn.style.display = 'block';
      border: 'none';
      padding: '15px';
      cursor: 'pointer';
      color: 'white';
      transition: '0.2s linear';
      background: ' #0b63f6';
      Notiflix.Notify.success(`${data.totalHits} images found`);

      if (data.totalHits >= PER_PAGE) {
        loadMoreBtn.classList.remove('is-hidden');
      }

      if (data.totalHits <= PER_PAGE) {
        loadMoreBtn.classList.add('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
    // Notiflix.Notify.failure(
    //   'Oops, something went wrong. Please try again later.'
    // );
  }
}

async function fetchNextPage() {
  currentPage += 1;

  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${currentSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${currentPage}`
    );

    if (data.hits.length > 0) {
      const images = data.hits
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => {
            return `
            <div>
              <img src="${webformatURL}" alt="${tags}" width="150px" heigth="150px"  />
              <p>
                Likes: ${likes}<br>
                Views: ${views}<br>
                Comments: ${comments}<br>
                Downloads: ${downloads}
              </p>
            </div>
          `;
          }
        )
        .join('');

      gallery.insertAdjacentHTML('beforeend', images);

      if (currentPage * PER_PAGE <= 40) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    } else {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.warning(
        'We are sorry but there are no more images to load.'
      );
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops, something went wrong. Please try again later.'
    );
  }
}
