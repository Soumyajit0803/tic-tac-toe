import getWinner from "./getWinner";

function ClickBox({ win, value, onBoxClick }) {
	return (
		<div className={`square ${win ? 'winningBox' : ''}`} onClick={onBoxClick}>{value}</div>
	)
}

export default function Game({ marker, board, handlePlay }) {
	const winningBoxes = getWinner(board);

	function update(i) {
		if (board[i] || winningBoxes[0]) return;

		const newBoard = board.slice();
		newBoard[i] = marker ? "x" : "o";
		handlePlay(newBoard);
	}

	return (
		<div className='game'>
			<div className='box'>
				{board.map((value, index)=>{
					return (
						<ClickBox key = {index} win={winningBoxes.includes(index) ?true : false} value = {value} onBoxClick={() => update(index)} />
					)
				})}
				
			</div>

		</div>
	)
}
