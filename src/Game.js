import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Options from './Options';
import Header from './Header';
import Footer from './Footer';

export default function Game() {
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState("Rock");
  const [turn_num, setTurn] = useState(0);
  const [score, setScore] = useState(0);
  useEffect(() => {postGameRender()}, [status]);

  const symbols = ["Rock","Scissors","Paper"];
  const relational_key = {
    symbol_key: symbols,
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
    
    // Game logic
    if(ai_symbol == relational_key.check(symbol.indexOf(symbol),true)) {
      // Player Victory
      setScore(score+1);
      setStatus("Victory");
    } else if (ai_symbol == relational_key.check(symbol.indexOf(symbol),false)) { 
      // Player Loss
      setScore(score-1);
      setStatus("Loss");
    } else {
      setStatus("Tie")
    }

    setHistory(symbol);
  }

  
  function postGameRender() {
    if(!status) {
      return;
    }

    setResults(<Footer symbol={"Play Again"} func={() => {Reset()}} outcome={status} player_move={history} relational_methods={relational_key}/>);
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