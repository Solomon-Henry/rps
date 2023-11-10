import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Header() {
  return (
    <div>
      <p> <b>Rules</b> </p>
      <pre>
        Rock beats Scissors
      </pre>
      <pre>  
        Paper beats Rock
      </pre>
      <pre>
        Scissors beats Paper
      </pre> 
      <hr></hr>
    </div>
  );
}

function Options(props) {
  const [symbol, setSymbol] = useState(props.symbol);
  return <button className='btn' onClick={props.onSquareClick}>{props.symbol}</button>
}
function Game() {

  function renderOptions() {

  }
  return (
    <div>
      <Header />
    </div>
  );
}

/*

Header
- Score 

Game
- Options

- Conditional: Result & Play Again

*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Header />);