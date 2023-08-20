export default function getWinner(matchBoard) {
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
	for (let i = 0; i < ways.length; i++) {
		const [a, b, c] = ways[i];
		if (matchBoard[a] && matchBoard[a] === matchBoard[b] && matchBoard[a] === matchBoard[c]) {
			return [matchBoard[a], a, b, c];
		}
	}
	let boardFull = true;
	for (let box of matchBoard) {
		if (box === null) {
			boardFull = false;
			break;
		}
	}
	return boardFull ? ["Draw"] : [null];
}