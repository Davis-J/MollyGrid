# MollyGrid
Project that's a daily movie trivia game that primarily focuses Mollywood. Inspired by MovieGrid.io

The objective of the game is to guess movies on each of the tiles of the 3x3 grid. Each guess should follow the corresponding criteria of the tile's row and column.
If your guess follows the listed criteria, you earn a point.
If your guess is incorrect, you will lose one of your limited chances to guess movies on the tiles.
The goal is to fill the entire grid with movies the follow the given criteria.

Currently has the following features:
- A 3x3 grid where each tile can be clicked to input a guess
- If the guess of the movie follows the criteria of the corresponding row and column, the movie poster gets displayed in response. If not, it shows that it was an incorrect guess. 
- Uses the MovieDB API to display movie posters during correct guesses and also to display the list of movies when inputting a guess.

Additional information:
- This project uses the MovieDB API in order to search for movies and retrieve posters.
- I am currently refactoring the code to React as a means to learn React practically.
