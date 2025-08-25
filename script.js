// Global variables
let activeBox = null; // this stores which box was clicked
let rowText, columnText; // This stores the row and column criteria of the active box


// API constants
const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjE1MTgwNDU1NTVmOTA4OTBiODQ2NTkyY2M4OGRmNyIsIm5iZiI6MTc1MDg4ODUwMS42NjksInN1YiI6IjY4NWM3MDM1MWMxZTQ2NDdhMDE1NTRhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gqLGCXdcaAQF-YIwj9Lfcll8ASr6Y6dmjpK-9tEG3EA";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
};
// Selecting Elements
const movieGuessModal = document.querySelector('#movieGuessModal');
const movieGuessCloseBtn = document.querySelector('#movieGuessCloseBtn');
const movieBoxes = document.querySelectorAll('.movieBox');
const movieInput = document.querySelector('#movieInput')
const movieList = document.querySelector('#movieList');
const movieListItems = document.querySelectorAll('.movieListItem')

// Constant string or integer values
const columnCriteria = [
  document.getElementById('column1'),
  document.getElementById('column2'),
  document.getElementById('column3')
];

const rowCriteria = [
  document.getElementById('row1'),
  document.getElementById('row2'),
  document.getElementById('row3')
];
const movieSearchListLength = 8;

//Event Listeners
movieBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    // Calculating box location
    const rowIndex = Math.floor(index / 3); 
    const colIndex = (index % 3); 

    // Getting the criteria details
    rowText = rowCriteria[rowIndex].textContent;
    columnText = columnCriteria[colIndex].textContent;

    // Show the modal
    movieGuessModal.style.display = 'block';
    ResetMovieListItems()
    //Active box to be saved
    activeBox = box;
    activeBox.textContent = "Hello";
    movieInput.value = '';
    movieInput.focus();
    // Display the criteria details via temperal literal
    document.getElementById('movieCriteria').textContent = `${rowText} X ${columnText}`;
  })
})

// Filter Function is no longer necessary
// function filterFunction() {
//   // Declare variables
//   var input, filter, ul, li, i, txtValue;
//   input = document.getElementById('movieInput');
//   filter = input.value.toUpperCase();
//   getMovieList(filter);
//   li = movieList.getElementsByTagName('li');

//   // Loop through all list items, and hide those who don't match the search query
//   for (i = 0; i < li.length; i++) {
//     txtValue = li[i].textContent || li[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }

movieGuessCloseBtn.addEventListener('click', () => {
  movieGuessModal.style.display = 'none';
})

window.onclick = function(event) {
  if ((event.target) === movieGuessModal) {
    movieGuessModal.style.display = 'none';
  }
}

function ResetMovieListItems() {
  var li = movieList.getElementsByTagName('li')
  for (i = 0; i < li.length; i++) {
    li[i].style.display = "";
  }
}

function IndexOf(e) {
  let el = e.target;
        let i=0;
        while(el.previousElementSibling ) {
          el=el.previousElementSibling;
          i++;
        }
  return i
}
//API CALLS ETC

//await means wait until asynchronous action is complete and then move on

async function GetMovieList() {
  var input, query
  input = document.getElementById('movieInput');
  query = input.value.toUpperCase();
  const getMovieListAPI = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  try {
    const response = await fetch (getMovieListAPI, options);

    if (!response.ok) {
      console.log ("This query couldn't be resolved");
    }
    data = await response.json();
    console.log(data);
    console.log(data.results.length);
    let movieInfoList = []
    movieList.innerHTML = ""
    for (i = 0; i<data.results.length; i++) {
      movieList.innerHTML += `<li class="movieListItem">${data.results[i].title}</li>`
      movieInfoList.push([data.results[i].poster_path,data.results[i].id]);
      if (i == movieSearchListLength - 1) {
        break;
      }
    }
    const movieListItems = document.querySelectorAll('.movieListItem');
    movieListItems.forEach(movieListItem => {
      movieListItem.addEventListener('click', (e) => {
        // const image = activeBox.querySelector("img");
        // image.src = "[The data.results.imagesource]"
        let i = IndexOf(e);
        (async (activeBox) => {
          flag = await MovieChecker(e, movieInfoList[i][1])
          console.log(await flag)
          if (flag) {
            activeBox.textContent = e.target.textContent;
            activeBox.innerHTML = `<img src='https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movieInfoList[i][0]}' />` 
          } else {
            activeBox.textContent = "Incorrect Guess";
          }
        })(activeBox) 
        movieGuessModal.style.display = 'none';
        activeBox = null;
      })
    })
    
  }
  catch(error) {
    console.error(error);
  }
}

async function MovieChecker(movieItem, movieID) {
  // Takes input from the click
  // Find the row and column of where the guess is input and retrieve row and column criteria
  const getActorCreditsAPI = `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`;

  try {
    const response = await fetch (getActorCreditsAPI, options);

    if (!response.ok) {
      console.log("This query couldn't be resolved");
    }
    data = await response.json();

    // checks if it meets the row criteria
    let castList = []
    // Has to retrieve information about the actors in the movie guessed
    for (i = 0; i<data.cast.length; i++) {
      castList.push(data.cast[i].name);
    }
    // Compare with the row criteria to allow or disallow
    if (!(castList.includes(rowText))) {
      console.log("False")
      return false;
    }

    //Checks if it meets the column criteria
    switch(columnText) {
      case "Released between 2020-2025":
        const getReleaseDateByID = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
        const resp = await fetch(getReleaseDateByID, options);
        releaseDateInfo = await resp.json();
        const guessReleaseDate = new Date(releaseDateInfo.release_date);
        let guessReleaseYear = guessReleaseDate.getFullYear();
        if (!(guessReleaseYear>=2020 && guessReleaseYear<=2025)) {
          console.log("Still False")
          return false;
        }
        break;
      case "Has a double letter":
        let previousChar = movieItem.target.textContent[0];
        let match = false;
        for (let i=1; i<movieItem.target.textContent.length; i++) {
          if (previousChar !== movieItem.target.textContent[i]) {
            previousChar = movieItem.target.textContent[i];
            continue
          } else {
            match = true;
            break;
          }
        }
        if (!match) {
          return false;
        } 
        break;
      case "Two Word Title":
        if (movieItem.target.textContent.split(" ").length < 2) {
          return false
        }
        break;
      default:
        console.log("Error: This column criteria does not have a case")
    }
    // Passes all checks
    console.log("It's True!")
    return true;
  } catch(error) {
    console.error(error);
  }

  // checks if it meets the row criteria
    // Has to retrieve information about the actors in the movie guessed
    // Compare with the row criteria
    // Allow or disallow
  // checks if it meets the column criteria
    // Has to retrieve information about the release date, double letter, two-word title
    // Allow or disallow
  // Once both checks have passed, display the movie
}