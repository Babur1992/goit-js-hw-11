// export const refs = {
//   searchForm: document.querySelector('#search-form'),
//   input: document.querySelector('.form-input'),
//   btnSubmit: document.querySelector('.btn-submit'),
//   button: document.querySelector('.btn'),
// };



// const apiKey = '36775018-abad017b89dacc6f8ffcc7875';
// let currentPage = 1;
// let currentQuery = '';

// async function searchImages(query) {
//   currentPage = 1;
//   currentQuery = query;
//   const galleryElement = document.querySelector('.gallery');
//   galleryElement.innerHTML = '';

//   const response = await fetch(
//     `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
//       query
//     )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
//   );
//   const data = await response.json();

//   if (data.hits.length === 0) {
//     notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return;
//   }

//   data.hits.forEach(image => {
//     const cardElement = createImageCard(image);
//     galleryElement.appendChild(cardElement);
//   });

//   if (data.totalHits > 40) {
//     const loadMoreButton = document.querySelector('.load-more-button');
//     loadMoreButton.style.display = 'block';
//   }
// }

// function createImageCard(image) {
//   const cardElement = document.createElement('div');
//   cardElement.classList.add('card');

//   const imageElement = document.createElement('img');
//   imageElement.src = image.webformatURL;
//   imageElement.alt = image.tags;

//   const detailsElement = document.createElement('div');
//   detailsElement.classList.add('details');

//   const likesElement = document.createElement('span');
//   likesElement.textContent = `Likes: ${image.likes}`;

//   const viewsElement = document.createElement('span');
//   viewsElement.textContent = `Views: ${image.views}`;

//   const commentsElement = document.createElement('span');
//   commentsElement.textContent = `Comments: ${image.comments}`;

//   const downloadsElement = document.createElement('span');
//   downloadsElement.textContent = `Downloads: ${image.downloads}`;

//   detailsElement.appendChild(likesElement);
//   detailsElement.appendChild(viewsElement);
//   detailsElement.appendChild(commentsElement);
//   detailsElement.appendChild(downloadsElement);

//   cardElement.appendChild(imageElement);
//   cardElement.appendChild(detailsElement);

//   return cardElement;
// }

// async function loadMoreImages() {
//   currentPage++;
//   const response = await fetch(
//     `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
//       currentQuery
//     )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
//   );
//   const data = await response.json();

//   const galleryElement = document.querySelector('.gallery');
//   data.hits.forEach(image => {
//     const cardElement = createImageCard(image);
//     galleryElement.appendChild(cardElement);
//   });

//   if (currentPage * 40 >= data.totalHits) {
//     const loadMoreButton = document.querySelector('.load-more-button');
//     loadMoreButton.style.display = 'none';
//     notiflix.Notify.info(
//       "We're sorry, but you've reached the end of search results."
//     );
//   }
// }

// document.querySelector('form').addEventListener('submit', event => {
//   event.preventDefault();
//   const query = event.target.elements.query;
//   searchImages(query);
// });

//   document.querySelector('.load-more-button')
//   document.addEventListener('click', loadMoreImages);
