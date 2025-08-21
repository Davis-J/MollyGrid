// Global variables
var activeBox = null; // this stores which box was clicked

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
const movieSearchListLength = 5;

//Event Listeners
movieBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    // Calculating box location
    console.log(index);
    const rowIndex = Math.floor(index / 3); 
    const colIndex = (index % 3); 

    // Getting the criteria details
    const rowText = rowCriteria[rowIndex].textContent;
    const columnText = columnCriteria[colIndex].textContent;

    // Show the modal
    movieGuessModal.style.display = 'block';
    ResetMovieListItems()
    //Active box to be saved
    activeBox = box;
    console.log(activeBox);
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
    let movieImageList = []
    movieList.innerHTML = ""
    for (i = 0; i<data.results.length; i++) {
      movieList.innerHTML += `<li class="movieListItem">${data.results[i].title}</li>`
      movieImageList.push(data.results[i].poster_path);
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
        console.log(i);
        activeBox.textContent = e.target.textContent;
        activeBox.innerHTML = `<img src='https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movieImageList[i]}' />` 
        console.log(activeBox);
        movieGuessModal.style.display = 'none';
        activeBox = null;
      })
    })
    console.log(movieImageList);
    
  }
  catch(error) {
    console.error(error);
  }
}
