import './GameOver.css';

const GameOver = ({error}) => {

    return (
            <div className="game-over-text">
                {error ? (<p>MUST BE 20 -> 200</p>) : (<p>GAME OVER</p>)}
            </div>
    );
};

export default GameOver;
