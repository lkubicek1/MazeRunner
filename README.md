# Maze Runner

Maze Runner is a web-based game that demonstrates the procedural generation of a maze using the **recursive backtracking algorithm**. The purpose of this game is to provide a fun and interactive way to explore the algorithm while challenging the player to navigate through the generated maze.

[**Play Maze Runner now!**](https://lkubicek1.github.io/maze-runner/)

## Recursive Backtracking Algorithm

The recursive backtracking algorithm is a depth-first search algorithm used to generate mazes. 
It works by visiting each cell in the grid, marking it as visited, and then recursively exploring the neighboring cells in random order. 
The algorithm backtracks when it reaches a dead-end, returning to the previous cells until it finds an unvisited neighbor. 
This process continues until all cells have been visited.

The algorithm can be summarized with the following steps:

1. Choose a random starting cell and mark it as visited.
2. While there are unvisited cells, perform the following steps:
    1. If the current cell has any unvisited neighbors, randomly choose one and remove the wall between them.
    2. Push the current cell onto a stack and move to the chosen neighbor cell.
    3. Mark the new current cell as visited.
    4. If there are no unvisited neighbors, pop a cell from the stack and make it the current cell (backtrack).
3. When the stack is empty, the maze is complete.

The resulting maze will have a single solution without any loops or isolated walls.

## How to Play

To play the Maze Runner game, use the WASD keys or arrow keys to navigate through the procedurally generated maze. The goal is to reach the exit, which is located at the opposite corner of the starting position.

The game also provides a reset button that allows you to regenerate a new maze with the specified width and height. To change the dimensions of the maze, enter the desired width and height in the input fields and press the reset button. The input fields will turn red to indicate that the maze dimensions have been modified and are pending an update. Once the reset button is clicked, the new maze will be generated with the updated dimensions.

## Getting Started

To run Maze Runner locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/lkubicek1/maze-runner.git
   ```

2. Change to the project directory:

   ```bash
   cd maze-runner
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```
   
4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to **http://localhost:3000** to start playing Maze Runner.

Have fun exploring the maze and learning about the recursive backtracking algorithm!
