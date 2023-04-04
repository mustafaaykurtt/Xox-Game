import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'

function XoxGameComponent() {
  const [games, setGames] = useState([]);
  const [mark, setMark] = useState("X");
  const [message, setMessage] = useState("");
  const [isGameFinish, setIsGameFinish] = useState(false);
  const [gameMove,setGameMove] = useState([]);

  useEffect(() => {
    newGame()
  }, [])

  const newGame = () => {
    setGames([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]);
    setIsGameFinish(false);
    setMark("X");
    setMessage("Hamle sırası " + mark);
  }

  const markGame = (index) => {
    if (!isGameFinish) {
      const newGames = [...games];
      if (newGames[index] == "") {
        newGames[index] = mark;
        setGames(newGames);
        setGameMove(val => [...val,newGames])

        let isFinish = isMoveFinish(newGames);
        if (isFinish) {
          setMessage("Oyun berabere");
          setIsGameFinish(true);
          return;
        }

        let r = isWin(newGames);
        if(r) {
          setMessage("Oyunu " + mark + " kazandı.")
          setIsGameFinish(true);
          return;
        }

        mark == "X" ? setMark("O") : setMark("X");
        setMessage("Hamle Sırası: " + (mark == "X" ? "O" : "X"))
      }
    }
  }

  const isWin = (newGames) => {
    //line control
    for (let i = 0; i < newGames.length; i += 3) {
      if (newGames[i] != "" && newGames[i] == newGames[i + 1]
        && newGames[i + 1] == newGames[i + 2]) {
        return true;
      }
    }
    //column control
    for (let i = 0; i < newGames.length / 3 + 1; i++) {
      if (newGames[i] != "" && newGames[i] == newGames[i + 3]
        && newGames[i + 3] == newGames[i + 6]) {
        return true;
      }
    }
    //major control
    if (newGames[0] != ""
      && newGames[0] === newGames[4]
      && newGames[4] === newGames[8]) {
      return true;
    }
    //minor control
    if (newGames[2] != ""
      && newGames[2] === newGames[4]
      && newGames[4] === newGames[6]) {
      return true;
    }

    return false;
  }

  function isMoveFinish(newGames) {
    if (newGames.includes("")) {
      return false;
    }
    return true;
  }

  const setThatGameMove = (game) => {
    setGames(game);
  }

  return (
    <>
      <div className='container text-center'>
        <h1>XOX oyunu</h1>
        <h2 className='alert alert-warning'>
          {message}
        </h2>
        <button onClick={newGame} className='btn btn-outline-primary w-100'>Yeni Oyun</button>
        <div className='row mt-2'>
          {games.map((game, index) => (
            <div
              key={index}
              className="col-md-4 box"
              onClick={() => markGame(index)}
            >
              {game}
            </div>
          ))}
        </div>
        <hr/>
          {gameMove.map((game,index) => (
            <button onClick={() => setThatGameMove(game)} className='btn btn-primary mx-2 mt-2' key={index}>{index+1}. Hamle</button>
          ))}
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<XoxGameComponent />);


reportWebVitals();
