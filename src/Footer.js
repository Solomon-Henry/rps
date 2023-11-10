import Options from "./Options";
export default function Footer(props) {
  let retval;
  
  if(props.outcome == "Victory") {
    retval = (
      <div>
        <p> <b>You Won!</b> </p>
        <p> {props.player_move} beats {props.relational_methods.check(props.relational_methods.symbol_key.indexOf(props.player_move,true))}!</p>
      </div>
    );
  } else if(props.outcome == "Loss") {
    retval = (
      <div>
        <p> <b>You Lost!</b> </p>
        <p> {props.player_move} loses to {props.relational_methods.check(props.relational_methods.symbol_key.indexOf(props.player_move,false))}!</p>
      </div>
    );
  } else if(props.outcome == "Tie") {
    retval = (
      <div>
        <p> <b>Tie Game!</b> </p>
        <p>{props.player_move} ties with itself!</p>
      </div>
    );
  }
  return (
    <div id="Footer">
      {retval}
      <Options symbol={props.symbol} onSymbolClick={props.func} id="Reset"/>
    </div>
  );
}