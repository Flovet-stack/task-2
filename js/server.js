const search = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
const loader = document.querySelector(".loader");
const message = document.querySelector(".message");

let state = {
  // default state
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message.style.display = "none";
  loader.classList.add("searching");

  // validate form
  if (!search.value) {
    message.innerHTML = "Please enter a movie title";
    message.style.display = "block";
    loader.classList.remove("searching"); //stop loader if validation fails
  } else {
    //run search
    fetch(
      "https://www.omdbapi.com/?apikey=db3d0611&t=" + encodeURI(search.value)
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
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
      })
      .catch((error) => {
        message.innerHTML =
          "Sorry we could not find the movie you are looking for";
        message.style.display = "block";
        return error;
      });
  }
});


