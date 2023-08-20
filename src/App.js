import './App.css';
import { useState } from 'react';
import Game from './Game';
import getWinner from "./getWinner";


export default function App() {

	//set the board, history, and marker
	const [hist, setHist] = useState([Array(9).fill(null)]);
	const [marker, setMarker] = useState(true);
	const currBoard = hist[hist.length - 1];

	// Track scores
	const [scoreX, setscoreX] = useState(0);
	const [scoreO, setscoreO] = useState(0);
	const [status, setStatus] = useState("x starts!")

	function controlGame(board) {
		const newHist = [...hist, board]
		setHist(newHist);
		setMarker(!marker);

		const winner = getWinner(board)[0];
		if (winner === "x") {
			setscoreX(scoreX + 1);
			setStatus("Winner: x")
		}
		else if (winner === "o") {
			setscoreO(scoreO + 1);
			setStatus("Winner: o")
		}
		else if (winner === "Draw") setStatus("Match Drawn")
		else setStatus("next Player: " + (marker ? "o" : "x"))
	}

	function refresh(option) {
		setHist([Array(9).fill(null)]);
		setMarker(true);
		setStatus("x starts");
		if (option) {
			setscoreO(0);
			setscoreX(0);
		}
	}

	function undo() {
		if (hist.length === 1) return;
		const curr = hist.pop();
		const won = getWinner(curr)[0]
		if (won) {
			if (won === "x") setscoreX(scoreX - 1);
			else if (won === "o") setscoreO(scoreO - 1);
		}

		setHist(hist);
		setStatus("next Player: " + (marker ? "o" : "x"));
		setMarker(!marker);

	}

	return (
		<div className="gamepage">
			<div className='status'>{status}</div>

			<Game marker={marker} board={currBoard} handlePlay={controlGame} />

			<div className='scoreboard'>
				Live Score<br />
				<div>x: {scoreX}</div>
				<div>o: {scoreO}</div>
			</div>

			<div className='statsholder'>
				<div className='stats' onClick={() => refresh(0)}>restart</div>
				<div className='stats' onClick={undo}>undo</div>
				<div className='stats' onClick={() => refresh(1)}>reset</div>
			</div>

		</div>
	)
}
