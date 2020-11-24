import './styles.css';
import GallaryCards from '../templates/gallery.hbs';
import NewsApiService from './api-service'


//https://pixabay.com/api/
//API-KEY: 19244879-147a84bd8a529ac8c96d916bd
const debounce = require('lodash.debounce');
const newsApiService = new NewsApiService();
const refs = {
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.form.addEventListener('input', debounce(onSubmit, 600))
refs.loadMoreBtn.addEventListener('click', onLodeMoreBtn)





function onSubmit(event) {
    event.preventDefault();
    
    newsApiService.queru = event.target.value;  
    newsApiService.resetPage();
    newsApiService.fetchArticles();
}



function onLodeMoreBtn() {
    newsApiService.fetchArticles();
}
