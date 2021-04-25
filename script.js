const APIURL = 'https://api.themoviedb.org/3/discover/movie?language=it&sort_by=popularity.desc&api_key=1943233873651364a0e5abc262fbc413';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?language=it&api_key=1943233873651364a0e5abc262fbc413&query=';

// Initially get all movies
getMovies(APIURL);

async function getMovies(url){

    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData.results);

    showMovies(respData.results);
    return respData;
}


function showMovies(movies){

    //clear main
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, vote_average, poster_path, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMGPATH+ poster_path}" alt="${title}">
        <div class="movie-info">
            
            <h3>${title}</h3>
            <span class=${getClassByAverage(vote_average)}>${vote_average}</span>
        </div> 
    `;

        if(overview){
            movieEl.innerHTML += `<div class="overview"><h3>Trama:</h3>${overview}</div>`;
        }

    main.appendChild(movieEl);
    });



}


function getClassByAverage(vote){
    if(vote >= 8){
        return 'green';
    } else if(vote >= 5){
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }

})