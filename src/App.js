import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Maze from './components/Maze';
import createMaze, {getStart, GOAL, OBSTACLE, PATH} from './utils/mazeGenerator';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";
import GameOver from "./components/GameOver";

function App(callback, deps) {
    const cellSize = 20;
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);
    const [inputWidth, setInputWidth] = useState(width);
    const [inputHeight, setInputHeight] = useState(height);
    const [inputChanged, setInputChanged] = useState(false);
    const [player, setPlayer] = useState(getStart(width, height));
    const [maze, setMaze] = useState(createMaze(player.x, player.y, width, height));
    const [won, setWon] = useState(false);
    const [inputError, setInputError] = useState(false);

    // Draw the maze on the canvas
    const drawMaze = (ctx) => {
        ctx.clearRect(0, 0, width * cellSize, height * cellSize);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (maze[y][x] === OBSTACLE) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                } else if (maze[y][x] === GOAL) {
                    ctx.fillStyle = '#21ff00';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    };

    // Draw the player on the canvas
    const drawPlayer = (ctx) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
    };

    const reset = () => {

        if(20 <= inputWidth && inputWidth <= 200 && 20 <= inputHeight && inputHeight <= 200)
        {
            setInputError(false);
            setWon(false);
            setWidth(inputWidth);
            setHeight(inputHeight);
            setPlayer(getStart(inputWidth, inputHeight));
            const newMaze = createMaze(player.x, player.y, inputWidth, inputHeight);
            setMaze(newMaze);
            setInputChanged(false);
        }
        else
        {
            setInputError(true);
        }
    };

    const handleKeyDown = useCallback(
        (event) => {

            if (!won) {
                let dx = 0;
                let dy = 0;

                switch (event.key) {
                    case 'w':
                    case 'W':
                    case 'ArrowUp':
                        dy = -1;
                        break;
                    case 'a':
                    case 'A':
                    case 'ArrowLeft':
                        dx = -1;
                        break;
                    case 's':
                    case 'S':
                    case 'ArrowDown':
                        dy = 1;
                        break;
                    case 'd':
                    case 'D':
                    case 'ArrowRight':
                        dx = 1;
                        break;
                    default:
                        break;
                }

                const newX = player.x + dx;
                const newY = player.y + dy;


                if (0 <= newX && newX < width) {
                    if (0 <= newY && newY < height) {
                        if (maze[newY][newX] === PATH) {
                            setPlayer({x: newX, y: newY});
                        } else if (maze[newY][newX] === GOAL) {
                            setPlayer({x: newX, y: newY});
                            setWon(true);
                        }
                    }
                }
            }
        }, [player, width, height, maze, won]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Box>
                    <Typography variant="h3" gutterBottom color="#f0e9e2">
                        Maze Runner
                    </Typography>
                    <Typography variant="subtitle1" color="#f0e9e2">
                        Use WASD or arrow keys to navigate the maze.
                    </Typography>
                </Box>
                {won && <GameOver error={false}/>}
                {inputError && <GameOver error={inputError}/>}
                <Maze
                    width={width}
                    height={height}
                    cellSize={cellSize}
                    maze={maze}
                    player={player}
                    drawMaze={drawMaze}
                    drawPlayer={drawPlayer}
                />
                <Box sx={{mt: 2}}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TextField
                                id="widthInput"
                                label="Width"
                                type="number"
                                value={inputWidth}
                                InputLabelProps={{style: {color: '#f0e9e2'}}}
                                InputProps={{
                                    inputProps: {min: 5},
                                    style: {color: '#f0e9e2'},
                                }}
                                variant="filled"
                                size="small"
                                onChange={(e) => {
                                    setInputWidth(parseInt(e.target.value));
                                    setInputChanged(true);
                                }}
                                error={inputChanged}
                                sx={{bgcolor: 'rgba(255, 255, 255, 0.1)'}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="heightInput"
                                label="Height"
                                type="number"
                                value={inputHeight}
                                InputLabelProps={{style: {color: '#f0e9e2'}}}
                                InputProps={{
                                    inputProps: {min: 5},
                                    style: {color: '#f0e9e2'},
                                }}
                                variant="filled"
                                size="small"
                                onChange={(e) => {
                                    setInputHeight(parseInt(e.target.value));
                                    setInputChanged(true);
                                }}
                                error={inputChanged}
                                sx={{bgcolor: 'rgba(255, 255, 255, 0.1)'}}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6f9a8d',
                                    '&:hover': {
                                        backgroundColor: '#5c8175',
                                    },
                                }}
                                onClick={reset}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );

}

// Add the createMaze function and other helper functions here

export default App;
