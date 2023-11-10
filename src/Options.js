export default function Options(props) {
  return <button className='btn' id={props.id} onClick={props.onSymbolClick}>{props.symbol}</button>
}