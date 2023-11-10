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
  return <button className='btn' id={props.id} onClick={props.onSymbolClick}>{props.symbol}</button>

}

function Footer(props) {
  let retval;
  if(props.outcome == "Victory") {
    retval = <p> <b>You Won!</b> </p>
  } else if(props.outcome == "Loss") {
    retval = <p> <b>You Lost!</b> </p>
  } else if(props.outcome == "Tie") {
    retval = <p> <b>Tie Game!</b> </p>
  }
  return (
    <div id="Footer">
      {retval}
      <Options symbol={props.symbol} onSymbolClick={props.func} id="Reset"  />
    </div>
  );
}
function Game() {
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState("Rock");
  const [turn_num, setTurn] = useState(0);
  const [score, setScore] = useState(0);
  useEffect(() => {postGameRender()}, [status]);

  const symbols = ["Rock","Scissors","Paper"];
  const relational_key = {
    win: 1,
    lose:-1,
    check: (index,status) => status ? symbols[(symbols.length+index+relational_key.win)%symbols.length] : symbols[(symbols.length+index+relational_key.lose)%symbols.length]
  };

  function handleClick(symbol) {
    if(status) {
      return;
    }
    let ai_symbol;

    // AI logic
    if((turn_num%3 == 0) && !(turn_num%2 == 0)) {
      // Losing symbol against previous move on every turn divisible by 3 but not 2
      ai_symbol = relational_key.check(symbols.indexOf(history),false);
    } else if (turn_num%2 == 0) {
      // Winning symbol against previous move on every turn divisible by 2
      ai_symbol = relational_key.check(symbols.indexOf(history),true);
    } else {
      // Matching symbol against previous move on every turn not divisible by 3 nor 2
      ai_symbol = history;
    }
    
    alert(ai_symbol);

    
    // Game logic
    if(ai_symbol == relational_key.check(symbol.indexOf(symbol),true)) {
      // Player Victory
      setScore(score+1);
      setStatus("Victory");
    } else if (ai_symbol == relational_key.check(symbol.indexOf(symbol),false)) { 
      // Player Wins
      alert("lossssl");
      setScore(score-1);
    }
    
    setHistory(symbol);
  }
  
  function postGameRender() {
    if(!status) {
      return;
    }
    setResults(<Footer symbol={"Play Again"} func={Reset()} />);
  }

  function Reset() {
    setTurn(turn_num => turn_num+1);
    setStatus(null);
    setResults(null);
  }

  return (
    <div>
      <div id="Header">
        <Header />
        <p> <b>Score: </b> {score} </p>
        <p> <b>Turn: </b> {turn_num} </p>
      </div>
      <div id="Game_Area">
        <Options symbol={symbols[0]} onSymbolClick={() => handleClick("Rock")} id="Rock" />
        <Options symbol={symbols[1]} onSymbolClick={() => handleClick("Scissors")} id="Scissors"/>
        <Options symbol={symbols[2]} onSymbolClick={() => handleClick("Paper")} id="Paper"/>
      </div>
      {results}
    </div>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);