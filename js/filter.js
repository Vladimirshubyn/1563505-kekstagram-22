import {getRandomArray, debounce} from './util.js';
import {updatePhotos} from './picture.js';

const filtersContainer = document.querySelector('.img-filters');
const filters = filtersContainer.querySelectorAll('.img-filters__button');
const DEBOUNCE = 500;

let currentFilter;

const setCurrentFilter = function (filter) {
  if (currentFilter) {
    currentFilter.classList.remove('img-filters__button--active');
  }
  filter.classList.add('img-filters__button--active');
  currentFilter = filter;
};

const identity = (value) => value;

const sortByComments = (photos) =>
  photos.slice().sort((x, y) => y.comments.length - x.comments.length);

const filterNameToFunction = {
  'filter-default': identity,
  'filter-discussed': sortByComments,
  'filter-random': getRandomArray,
};

const filterPhotos = function (evt, photos) {
  const appliedFilter = evt.target;

  if (appliedFilter !== currentFilter) {
    setCurrentFilter(appliedFilter);

    const filteredPhotos = filterNameToFunction[appliedFilter.id](photos);
    updatePhotos(filteredPhotos);
  }
};

const initialize = function (photos) {
  filtersContainer.classList.remove('img-filters--inactive');
  currentFilter = filters[0];
  Array.from(filters).forEach((filter) =>
    filter.addEventListener('click', function (evt) {
      debounce(() => filterPhotos(evt, photos), DEBOUNCE);
    }),
  );
};

export {initialize};
