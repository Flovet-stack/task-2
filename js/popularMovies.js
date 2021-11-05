const popularMovies = [
  "game of thrones",
  "avengers infinity war",
  "naruto shippuden",
  "12 years a slave",
  "lord of the rings",
  "lion king",
  "money heist",
  "titanic",
  "squid game",
  "the pursuit of happyness",
  "the shawshank redemption",
  "Raiders Of The Lost Ark",
  "back to the future",
  "men in black",
  "blood diamond",
  "jaws",
  "the sound of music",
  "the social network",
];

const popolar = document.getElementById("popular");
// fetch result for every element in the popularMovies array
popularMovies.forEach((movie) => {
  fetch("https://www.omdbapi.com/?apikey=db3d0611&t=" + encodeURI(movie))
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log(result);
      let movieCard = `
                    <div class="movie-card">
                        <div class="img-con">
                            <img src="${result.Poster}" alt="">
                            <div class="overlay">
                                <div>
                                    <p>${result.imdbRating} / 10</p>
                                    <div class="genres">${result.Genre}</div>
                                    <a href="#details" onclick="showDetails()" data-link="${result.Title}" class="btn btn-primary view-details">View Details</a>
                                </div>
                            </div>
                            <div class="bookmark"></div>
                        </div>
                        <div class="info">
                            <div class="name">${result.Title}</div>
                            <div class="date">${result.Year}</div>
                            <div class="resolutions">
                                <div class="pill">${result.Type}</div>
                            </div>
                        </div>
                    </div>
                    `;
      popular.insertAdjacentHTML("beforeend", movieCard); //appendmovie cards to template
    });
});

// show movie data on view details button click
let viewDetailsBtns = document.getElementsByClassName("view-details");
viewDetailsBtns = Array.from(viewDetailsBtns);

const showDetails = () => {
  const link = window.event.target.getAttribute("data-link");
  //run search
  fetch("https://www.omdbapi.com/?apikey=db3d0611&t=" + encodeURI(link))
    .then((response) => {
      const details = document.getElementById('details');
      details.style.display = "block"
      return response.json();
    })
    .then((result) => {
      bookmarkCon.style.display = "none";
      loader.classList.remove("searching"); // stop loader after request

      // populating the template
      const movieTitle = document.querySelector(".movie-title");
      const movieYear = document.querySelector(".movie-year");
      const movieCats = document.querySelector(".movie-cats");
      const movieCover = document.querySelector(".movie-cover");
      const moviePlot = document.querySelector(".movie-plot");
      const movieType = document.querySelector(".movie-type");
      const author = document.getElementById("author");
      const releaseDate = document.getElementById("release-date");
      const runtime = document.getElementById("runtime");
      const awards = document.getElementById("awards");
      const country = document.getElementById("country");
      const director = document.getElementById("director");
      const movieRating = document.querySelector(".movie-rating");
      const movieCast = document.querySelector(".actors ul");

      movieTitle.innerHTML = result.Title;
      movieYear.innerHTML = result.Year;
      moviePlot.innerHTML = result.Plot;
      movieRating.innerHTML = result.imdbRating;
      movieType.innerHTML = result.Type;
      author.innerHTML = result.Writer;
      releaseDate.innerHTML = result.Released;
      runtime.innerHTML = result.Runtime;
      awards.innerHTML = result.Awards;
      country.innerHTML = result.Country;
      director.innerHTML = result.Type;
      movieCover.setAttribute("src", result.Poster);
      categories = Array.from(result.Genre.split(","));
      categories.forEach((genre) => {
        genre = `<div class="pill">${genre}</div>`;
        movieCats.insertAdjacentHTML("beforeend", genre);
      });
      cast = Array.from(result.Actors.split(","));
      cast.forEach((actor) => {
        actor = `<li>${actor}</li>`;
        movieCast.insertAdjacentHTML("beforeend", actor);
      });
    });
};