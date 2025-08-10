// Global variables
let activeBox = null; // this stores which box was clicked

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
    resetMovieListItems()
    //Active box to be saved
    activeBox = box;
    activeBox.textContent = "Hello";
    movieInput.value = '';
    movieInput.focus();
    // Display the criteria details via temperal literal
    document.getElementById('movieCriteria').textContent = `${rowText} X ${columnText}`;
  })
})

movieListItems.forEach(movieListItem => {
  movieListItem.addEventListener('click', () => {
    activeBox.textContent = movieListItem.textContent;
    movieGuessModal.style.display = 'none';
    activeBox = null;
  })
})


function filterFunction() {
  // Declare variables
  var input, filter, ul, li, i, txtValue;
  input = document.getElementById('movieInput');
  filter = input.value.toUpperCase();
  getMovieList(filter);
  li = movieList.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

movieGuessCloseBtn.addEventListener('click', () => {
  movieGuessModal.style.display = 'none';
})

window.onclick = function(event) {
  if ((event.target) === movieGuessModal) {
    movieGuessModal.style.display = 'none';
  }
}

function resetMovieListItems() {
  var li = movieList.getElementsByTagName('li')
  for (i = 0; i < li.length; i++) {
    li[i].style.display = "";
  }
}

//API CALLS ETC

//await means wait until asynchronous action is complete and then move on

async function getMovieList(query) {
  const getMovieListAPI = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  try {
    const response = await fetch (getMovieListAPI, options);

    if (!response.ok) {
      console.log ("This query couldn't be resolved");
    }
    console.log(response);
    data = await response.json();
    
    console.log(data.results.length);
    let movieSearchList = []
    movieList.innerHTML = ""
    for (i = 0; i<data.results.length; i++) {
      movieList.innerHTML += `<li class="movieListItem">${data.results[i].title}</li>`
      movieSearchList.push(data.results[i].title);
      if (i == movieSearchListLength - 1) {
        break;
      }
    }
    console.log(movieSearchList);
    
  }
  catch(error) {
    console.error(error);
  } 
  // RANDOM CODE THOUGHTS
  // take input from the search bar
  // use the above api function to get a maximum of 15 movies with that title
  // take the relevant information from what is returned
  // Use the relevant information to display on the drop down list
}