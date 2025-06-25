// Global variables
let activeBox = null; // this stores which box was clicked

// Selecting Elements
const movieGuessModal = document.querySelector('#movieGuessModal');
const movieGuessCloseBtn = document.querySelector('#movieGuessCloseBtn');
const movieBoxes = document.querySelectorAll('.movieBox');
const movieInput = document.querySelector('#movieInput')
const movieList = document.querySelector('#movieList');
const movieListItems = document.querySelectorAll('.movieListItem')
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