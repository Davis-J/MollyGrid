// Selecting Elements
const movieGuessModal = document.querySelector('#movieGuessModal')
const movieGuessCloseBtn = document.querySelector('#movieGuessCloseBtn')
const movieBoxes = document.querySelectorAll('.movieBox')

movieBoxes.forEach(box => {
  box.addEventListener('click', () => {
    //Get the criteria details
    // const movieCriteria = 
    // Show the modal
    movieGuessModal.style.display = 'block';
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