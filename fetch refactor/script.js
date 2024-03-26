const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

// function getMovieDetail(imdbid) {
//   return fetch("http://www.omdbapi.com/?apikey=67144db4&s=" + imdbid)
//     .then((response) => response.json())
//     .then((m) => m);
// }

function getMovieDetail(imdbid) {
  return fetch(`http://www.omdbapi.com/?apikey=67144db4&i=${imdbid}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((e) => console.error("Fetch error:", e));
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

// function getMovies(keyword) {
//   return fetch("http://www.omdbapi.com/?apikey=67144db4&s=" + keyword)
//     .then((response) => response.json())
//     .then((response) => response.search);
// }

function getMovies(keyword) {
  return fetch(`http://www.omdbapi.com/?apikey=67144db4&s=${keyword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => response.Search) // Corrected from 'response.search' to 'response.Search'
    .catch((e) => console.error("Fetch error:", e));
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showCards(m) {
  return `<div class="col-md-4 my-5">
            <div class="card" >
                <img src="${m.Poster}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">$ ${m.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                </div>
            </div>
          </div>`;
}

function showMovieDetail(m) {
  return `            
          <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${m.Poster}" alt="" class="img-fluid" />
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                <li class="list-group-item"><strong> Director </strong>${m.Director}</li>
                <li class="list-group-item"><strong> Actors: </strong>${m.Actors}</li>
                <li class="list-group-item"><strong> Writer: </strong>${m.Writer}</li>
                <li class="list-group-item"><strong> Plot: </strong>${m.Plot}</li>
              </ul>
            </div>
          </div>
        </div>`;
}
