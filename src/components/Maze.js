import React, { useEffect } from 'react';
import styles from './Maze.module.css'; // Import the CSS module

const Maze = ({ width, height, cellSize, maze, player, drawMaze, drawPlayer }) => {
    const canvasRef = React.useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        drawMaze(ctx);
        drawPlayer(ctx);
    }, [maze, player, drawMaze, drawPlayer]);

    return (
        <div className={`${styles.mazeContainer}`}>
            <canvas
                ref={canvasRef}
                width={width * cellSize}
                height={height * cellSize}
                className={styles.canvas}
            ></canvas>
        </div>
    );
};

export default Maze;
