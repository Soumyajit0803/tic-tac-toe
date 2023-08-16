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

function App() {

	const [board, setBoard] = useState(Array(9).fill(null));

	const [marker, setmarker] = useState(true);

	function update(i){
		if(board[i] || getWinner(board))return;

		const newBoard = board.slice();
		newBoard[i] = marker?"X":"O";
		setmarker(!marker);
		setBoard(newBoard);
	}

	function onRestart(){
		setBoard(Array(9).fill(null));
	}

	const winner = getWinner(board);
	let status;
	if(winner==="X" || winner === "O") status = "Winner: "+ winner;
	else if(winner === "Draw")status = "Match drawn";
	else status = "Next player: "+(marker?"X":"O");

	return (
		<div className='game'>
			<div className='box'>
				<div className='status'>{status}</div>
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
			
			<div className='statsholder'>
				<div className='stats' onClick={onRestart}>restart</div>
				<div className='stats'>undo</div>
			</div>
			
		</div>
	)
}



export default App;
