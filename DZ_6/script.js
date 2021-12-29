function filmView(id, img, title, originName, year, rating, length, genres, countries) {
    let contentBlock = document.querySelector('.content-block');

    const genresToString = genres.map((genreItem) => genreItem.genre).join(', ');

    const countriesToString = countries.map((countryItem) => countryItem.country).join(', '); 

    const temp = `
    <div class="movie-item" data-id="${id}">
        <div class="img-block">
            <img src="${img}" alt="">
        </div>
            <div class="movie-title">${title}</div>
            <div class="movie-item-content">
            <div class="movie-original-name">${originName || title}</div>
            <div class="movie-year">${year}</div>
            <div class="movie-rating">Rating - ${rating}</div>
            <div class="movie-length">Duration - ${length}</div>
            <div class="movie-genres">${genresToString}</div>
            <div class="movie-countries">${countriesToString}</div>
        </div>

    </div>`;

    contentBlock.insertAdjacentHTML("beforeend", temp);
}


function filmModalView(img, nameOriginal, nameRu, description, shortDescription, slogan, ratingAge, year, length, genres, countries, criticsRating, kinopoiskRating, ratingMpaa, has3d, hasImax) {
    const wrapperModalWindow = document.querySelector('.wrapper-modal-window');

    const genresToString = genres.map((genreItem) => genreItem.genre).join(', ');

    const countriesToString = countries.map((countryItem) => countryItem.country).join(', ');

    function getTimeFromMinutes(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч. ' + minutes + 'м.';
    };


    const limitAge = ratingAge ? `${ratingAge.slice(3)}+` : "The movie doesn't have age limit";

    wrapperModalWindow.innerHTML = `
    <div class="modal-window">
        <div class="modal-window-content">
            <div class="modal-window-img-block">
                <img src="${img}" alt="">
            </div>

            <div class="modal-window-info">
                <div class="modal-window-movie-title modal-window-info-item">${nameOriginal || nameRu}</div>
                <div class="modal-window-movie-nameRu modal-window-info-item">${nameRu}</div>
                <div class="about-movie">
                    <div class="modal-window-main-description modal-window-info-item">${description}</div>
                    <div class="modal-window-short-description modal-window-info-item">${shortDescription || "Short description is not found"}</div>
                    <div class="modal-window-slogan modal-window-info-item"><span class="bold-detail-headers">Slogan: </span>${slogan || "Slogan is not found"}</div>

                    <div class="modal-window-rating-age modal-window-info-item"><span class="bold-detail-headers">Rating age limits: </span>${limitAge}</div>
                    <div class="modal-window-rating-age modal-window-info-item"><span class="bold-detail-headers">Year: </span>${year}</div>
                    <div class="modal-window-movie-length modal-window-info-item"><span class="bold-detail-headers">Movie duration: </span>${getTimeFromMinutes(length)}</div>
                    <div class="modal-window-movie-genres modal-window-info-item"><span class="bold-detail-headers">Genre: </span>${genresToString}</div>
                    <div class="modal-window-movie-countries modal-window-info-item"><span class="bold-detail-headers">Country: </span>${countriesToString}</div>
                    <div class="modal-window-rating-critics modal-window-info-item"><span class="bold-detail-headers">Critics rating: </span>${criticsRating || "Rating is not found"}</div>
                    <div class="modal-window-kinopoisk-rating modal-window-info-item"><span class="bold-detail-headers">Kinopoisk rating: </span>${kinopoiskRating}</div>
                    <div class="modal-window-rating-Mpaa modal-window-info-item"><span class="bold-detail-headers">Kinopoisk Mpaa: </span>${ratingMpaa || "G"}</div>
                    <div class="modal-window-movie-has-3d modal-window-info-item"><span class="bold-detail-headers">Has 3D: </span>${has3d || "The movie doesn't support 3D"}</div>
                    <div class="modal-window-movie-has-Imax modal-window-info-item"><span class="bold-detail-headers">Has IMAX: </span>${hasImax || "The movie doesn't support IMAX"}</div>
                </div>
            </div>
        </div>
    </div>`;

    wrapperModalWindow.classList.add('open');

    document.body.classList.add('open-modal');
}

let promise = fetch(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1", {
        method: "GET",
        headers: {
            "X-API-KEY": "8a36384c-e433-4a0c-a9a1-e43c83bb88f6",
            "Content-Type": "application/json",
        },
    }
);

promise
    .then((res) => res.json())
    .then((data) => {
        data.films.map((film) => {
            filmView(film.filmId, film.posterUrl, film.nameRu, film.nameEn, film.year, film.rating, film.filmLength, film.genres, film.countries);
        });

        console.log(data);
    });

function showInfoById(filmId) {
    let promise = fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, {
            method: "GET",
            headers: {
                "X-API-KEY": "8a36384c-e433-4a0c-a9a1-e43c83bb88f6",
                "Content-Type": "application/json",
            },
        }
    );

    promise
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        filmModalView(data.posterUrl, data.nameOriginal, data.nameRu, data.description, data.shortDescription, data.slogan, data.ratingAgeLimits, data.year, data.filmLength, data.genres, data.countries, data.ratingFilmCritics, data.ratingKinopoisk, data.ratingMpaa, data.has3D, data.hasImax);
    });
}

document.getElementById('movies').addEventListener('click', function(event) {
    const movieItem = event.path.find((elem) => elem.classList.contains('movie-item'));
    if(movieItem) {
        const filmId = movieItem.dataset.id;
        showInfoById(filmId);
    }
});

document.querySelector('.wrapper-modal-window').addEventListener('click', function(event) {
   if(event.target.classList.contains('wrapper-modal-window')) {
       event.target.classList.remove('open');
       document.body.classList.remove('open-modal');
   }
});
