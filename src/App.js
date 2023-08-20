import './App.css';
import {useState} from 'react';

function ClickBox({value, onBoxClick}){
	return (
		<div className='square' onClick = {onBoxClick}>{value}</div>
	)
}

function getWinner(matchBoard){
	const ways = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	for(let i = 0; i<ways.length; i++){
		const [a,b,c] = ways[i];
		if(matchBoard[a] && matchBoard[a] === matchBoard[b] && matchBoard[a] === matchBoard[c])
			return matchBoard[a]
	}
	let boardFull = true;
	for(let box of matchBoard){
		if(box === null){
			boardFull = false;
			break;
		}
	}
	return boardFull?"Draw":null;
}

function Game({marker,board,handlePlay}) {

	function update(i){
		if(board[i] || getWinner(board))return;

		const newBoard = board.slice();
		newBoard[i] = marker?"X":"O";
		handlePlay(newBoard);
	}

	return (
		<div className='game'>
			<div className='box'>
				<ClickBox value = {board[0]} onBoxClick={()=>update(0)}/>
				<ClickBox value = {board[1]} onBoxClick={()=>update(1)}/>
				<ClickBox value = {board[2]} onBoxClick={()=>update(2)}/>
				<ClickBox value = {board[3]} onBoxClick={()=>update(3)}/>
				<ClickBox value = {board[4]} onBoxClick={()=>update(4)}/>
				<ClickBox value = {board[5]} onBoxClick={()=>update(5)}/>
				<ClickBox value = {board[6]} onBoxClick={()=>update(6)}/>
				<ClickBox value = {board[7]} onBoxClick={()=>update(7)}/>
				<ClickBox value = {board[8]} onBoxClick={()=>update(8)}/>
			</div>
			
		</div>
	)
}

export default function App(){

	//set the board, history, and marker
	const [hist, setHist] = useState([Array(9).fill(null)]);
	const [marker, setMarker] = useState(true);
	const currBoard = hist[hist.length-1];

	// Track scores
	const [scoreX, setscoreX] = useState(0);
	const [scoreO, setscoreO] = useState(0);
	const [status, setStatus] = useState("Start Game!")

	function controlGame(board){
		const newHist = [...hist, board]
		setHist(newHist);
		setMarker(!marker);

		const winner = getWinner(board);
		if(winner === "X"){
			setscoreX(scoreX+1);
			setStatus("Winner: X")
		}
		else if(winner === "O"){
			setscoreO(scoreO+1);
			setStatus("Winner: O")
		}
		else if (winner === "Draw") setStatus("Match Drawn")
		else setStatus("next Player: "+(marker?"O":"X"))
	}

	function restart(){
		setHist([Array(9).fill(null)]);
		setStatus("Start Game!");
		setMarker(true);
	}

	function undo(){
		if(hist.length === 1)return;
		const curr = hist.pop();
		const won = getWinner(curr)
		if(won){
			if(won === "X")setscoreX(scoreX-1);
			else if(won === "O") setscoreO(scoreO-1);
		}

		setHist(hist);
		setStatus("next Player: "+(marker?"O":"X"));
		setMarker(!marker);
		
	}

	return (
		<div className="gamepage">
			<div className='status'>{status}</div>
			<Game marker = {marker} board = {currBoard} handlePlay = {controlGame} />
						
			<div className='statsholder'>
				<div className='stats' onClick={restart}>restart</div>
				<div className='stats' onClick = {undo}>undo</div>
			</div>
			<div className='scoreboard'>
				x: {scoreX}<br/>
				o: {scoreO}
			</div>
		</div>
	)
}
