"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // const myArray = await getJSON();
  const form = document.getElementById("form-id");
  const params = document.getElementById("movie-name");

  form.addEventListener("submit", async (event) => {
    // Prevent page reload
    event.preventDefault();

    const movieOutput = document.getElementById("movie-info");

    const getJSON = async () => {
      const movieData = await fetch(
        `http://www.omdbapi.com/?t=${params.value}&apikey=f6e466c`
      ).then((response) => response.json());
      return movieData;
    };

    const movieObject = await getJSON();

    console.log(movieObject);

    for (let movieInfo in movieObject) {
      const paragraph = document.createElement("p");
      const img = document.createElement("img");

      let i = movieObject[movieInfo];

      let keyAndValue = `${movieInfo}: ${i}`;

      if (movieInfo == "Poster") {
        img.src = i;
      } else {
        paragraph.textContent = keyAndValue;
      }

      if (movieInfo == "Ratings" && movieObject["Ratings"].length > 0) {
        movieObject["Ratings"].forEach((ratingInfo) => {
          let ratingSourceValue = `${ratingInfo.Source}: ${ratingInfo.Value}`;
          paragraph.textContent = ratingSourceValue;
        });
      }

      movieOutput.appendChild(paragraph);
      movieOutput.appendChild(img);
    }
  });
});
