export default class NewsApiService{
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    
    //metod
    fetchArticles() {
        console.log(this);
        const API_KEY = '19244879-147a84bd8a529ac8c96d916bd';



      return  fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(r => r.json())
            .then(data => {
                this.incrementPage();
                return data.articles;
            }); 
    }
    incrementPage() {
    this.page += 1; 
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }

    set guery(newQuery) {
        this.searchQuery = newQuery;
    }
}