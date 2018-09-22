import React from 'react';
import Board from './Board';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				stepNumber: 0,
			}],
			currentStepNumber: 0,
			xIsNext: true,
			isAscending: true,
		}
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = (this.state.xIsNext ? 'X' : 'O');

		this.setState({
			history: history.concat([{
				squares: squares,
				location: getLocation(i),
				stepNumber: history.length,
			}]),
			currentStepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	toggleSortHistory() {
		this.setState({
			isAscending: !this.state.isAscending,
		});
	}

	jumpTo(step) {
		this.setState({
			currentStepNumber: step,
			xIsNext: (step % 2) === 0,
		})
	}

	render() {
		const { history, currentStepNumber } = this.state;
		const current = history[currentStepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, i) => {
			const { currentStepNumber } = this.state;
			const currentLocation = step.location || '';
			const desc = step.stepNumber ? `Go back to move #${step.stepNumber} (${currentLocation})` : 'Go to game start';
			const highlightCurrentMove = (currentStepNumber === i);

			return (
				<li key={step.stepNumber}>
					<button key={step.stepNumber} className={ highlightCurrentMove ? "bold" : ""} onClick={() => this.jumpTo(i)} >
						{desc}
					</button>
				</li>
			);
		});
		const displayMoves = (this.state.isAscending ? moves : moves.reverse());

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<button onClick={() => this.toggleSortHistory()}>Sort</button>
					<ul>{displayMoves}</ul>
				</div>
			</div>
		);
	}
}

function getLocation(boardIndex) {
	const locations = {
		0: 'row: 1, col: 1',
		1: 'row: 1, col: 2',
		2: 'row: 1, col: 3',
		3: 'row: 2, col: 1',
		4: 'row: 2, col: 2',
		5: 'row: 2, col: 3',
		6: 'row: 3, col: 1',
		7: 'row: 3, col: 2',
		8: 'row: 3, col: 3',
	};

	return locations[boardIndex];
};

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

export default Game;