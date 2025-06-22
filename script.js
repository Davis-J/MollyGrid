// Selecting Elements
const movieGuessModal = document.querySelector('#movieGuessModal');
const movieGuessCloseBtn = document.querySelector('#movieGuessCloseBtn');
const movieBoxes = document.querySelectorAll('.movieBox');
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
    // Display the criteria details via temperal literal
    document.getElementById('movieCriteria').textContent = `${rowText} X ${columnText}`;
  })
})

movieGuessCloseBtn.addEventListener('click', () => {
  movieGuessModal.style.display = 'none';
})

window.onclick = function(event) {
  if ((event.target) === movieGuessModal) {
    movieGuessModal.style.display = 'none';
  }
}