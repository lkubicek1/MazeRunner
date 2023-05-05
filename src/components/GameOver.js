import './GameOver.css';

const GameOver = ({error}) => {

    return (
            <div className="game-over-text">
                {error ? (<p>MUST BE +20</p>) : (<p>GAME OVER</p>)}
            </div>
    );
};

export default GameOver;
