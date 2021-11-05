const search = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
const loader = document.querySelector(".loader");
const message = document.querySelector(".message");
const movieMessage = document.querySelector(".movie-message");
const bookmarkCon = document.querySelector(".bookmark-con");
const details = document.getElementById("details");

let state = {
  // default state
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message.style.display = "none";
  loader.classList.add("searching");
  bookmarkCon.style.display = "none";

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
        details.style.display = "block";
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

// bookmarking a movie
bookmarks = [];

bookmark.addEventListener("click", (name) => {
  const movieTitle = document.querySelector(".movie-title");
  name = movieTitle.innerText;
  movieMessage.style.display = "none";
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // check if movie has already been bookmarked
  if (bookmarks.indexOf(name) > -1) {
    bookmarks.push(name);

    movieMessage.innerHTML = "This movie has already been bookmarked";
    movieMessage.style.display = "block";
  } else {
    bookmarks.push(name);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
});

const showBookmarks = () => {
  details.style.display = 'none';
  bookmarkCon.style.display = 'block';
  JSON.parse(localStorage.getItem('bookmarks')).forEach((movie) => {
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
        document.getElementById('bookmarks').insertAdjacentHTML("beforeend", movieCard); //appendmovie cards to template
      });
  });
};
