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

	// const [board, setBoard] = useState(Array(9).fill(null));

	// const [marker, setmarker] = useState(true);

	function update(i){
		if(board[i] || getWinner(board))return;

		const newBoard = board.slice();
		newBoard[i] = marker?"X":"O";
		// setmarker(!marker);
		// setBoard(newBoard);
		handlePlay(newBoard);
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
			
		</div>
	)
}

export default function App(){
	const [currmove, setCurrmove] = useState(0);
	const [hist, setHist] = useState([Array(9).fill(null)]);
	const marker = currmove%2===0;
	const currBoard = hist[currmove];

	function controlGame(board){
		const newHist = [...hist.slice(0, currmove+1), board]
		setHist(newHist);
		setCurrmove(newHist.length-1);
	}

	function jumpTo(nextMove){
		setCurrmove(nextMove);
	}

	const moves = hist.map((elm, idx)=>{
		let text;
		text = idx>0?"go to move #"+idx:"go to game start";
		return (
			<li key = {idx}>
				<button onClick={()=>jumpTo(idx)}>{text}</button>
			</li>
		)
	})

	return (
		<div className="gamepage">
			<Game marker = {marker} board = {currBoard} handlePlay = {controlGame} />
						
			<div className='statsholder'>
				<div className='stats'>restart</div>
				<div className='stats'>undo</div>
			</div>
			<div className='history'>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}
