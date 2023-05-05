export const OBSTACLE = 0;
export const PATH = 1;
export const PLAYER = 2;
export const GOAL = 3;

export const getStart = (width, height) => {

    const getRandomOdd = (limit) => {
        const num = Math.floor(Math.random() * limit);
        return num % 2 === 0 ? num + 1 : num;
    }

    return { x: getRandomOdd(width), y: getRandomOdd(height) }

}

export default function createMaze(startX, startY, width, height) {

    let playerSet = false;

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Initialize the grid
    const grid = Array.from({ length: height }, () =>
        Array(width).fill(OBSTACLE)
    );

    function getNeighbors(x, y) {
        const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];

        return directions
            .map(([dx, dy]) => [x + dx * 2, y + dy * 2])
            .filter(([nx, ny]) => {
                return nx >= -1 && nx < width && ny >= -1 && ny < height;
            });
    }

    function visit(x, y) {

        if(!playerSet) {
            grid[y][x] = PLAYER;
            playerSet = true;
        } else {
            grid[y][x] = PATH;
        }

        const neighbors = getNeighbors(x, y);
        shuffleArray(neighbors);

        for (const [nx, ny] of neighbors) {
            if (ny === -1 || nx === -1 || (grid[ny] && (grid[ny][nx] === OBSTACLE))) {
                const midX = (x + nx) / 2;
                const midY = (y + ny) / 2;

                if (grid[midY] && grid[midY][midX] === OBSTACLE) {
                    grid[midY][midX] = PATH;
                    if(ny > 0 && nx > 0) {
                        visit(nx, ny);
                    }
                }
            }
        }
    }

    visit(startX, startY);

    let goalSet = false;

    for(let i= width - 1; i > width / 2; i--) {
        if(grid[height - 1][i] === PATH) {
            grid[height - 1][i] = GOAL;
            goalSet = true;
            break;
        }
    }

    if(!goalSet) {
        for(let i = height - 1; i > width / 2; i--) {
            if(grid[i][width - 1] === PATH) {
                grid[0][width - 1] = GOAL;
                break;
            }
        }
    }

    return grid;
}
