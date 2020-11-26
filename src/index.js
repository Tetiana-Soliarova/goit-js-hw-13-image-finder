import './styles.css';
import GallaryCards from '../templates/gallery.hbs';
import NewsApiService from './api-service';
import LoadMoreBatton from './load-more-btn';


const debounce = require('lodash.debounce');
const newsApiService = new NewsApiService();
const loadMoreBatton = new LoadMoreBatton({
    selector: '[data-action="load-more"]',
    hidden: true,
});



const refs = {
    form: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
};

refs.form.addEventListener('input', debounce(onSubmit, 700))
loadMoreBatton.refs.button.addEventListener('click', onFetchHits)
loadMoreBatton.refs.label.addEventListener('click', onScrollTo)

function onSubmit(event) {
    event.preventDefault();
    
    newsApiService.query = event.target.value;
    loadMoreBatton.show();
    newsApiService.resetPage();
        clearHitsContainer();
    onFetchHits();
}


function onFetchHits() {
    loadMoreBatton.disable();
    newsApiService.fetchHits().then(hits => {
        appendHitsMarkup(hits);
        loadMoreBatton.enable();
    });
}


function appendHitsMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', GallaryCards(hits));
}


function clearHitsContainer() {
    refs.galleryContainer.innerHTML = '';
}



function onScrollTo() {
    let value = document.body.scrollHeight;
    setTimeout(() => {
        window.scrollTo({
            top: value,
            left: 0,
            behavior: 'smooth',
        });
    }, 1000);
}