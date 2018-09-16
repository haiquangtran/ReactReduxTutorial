import React from 'react';
import Square from './Square';

class Board extends React.Component {

	createBoard(rows, cols) {
		const boardRows = [];
		let counter = 0;
		for (let i = 0; i < rows; i++) {
			const boardColumns = [];
			for (let j = 0; j < cols; j++) {
				boardColumns.push(this.renderSquare(counter++));
			}
			boardRows.push(<div className="board-row">{boardColumns}</div>);
		}
		
		return <div>{boardRows}</div>
	}

	renderSquare(i) {
		return <Square
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
		/>;
	}

	render() {
		return this.createBoard(3,3);
	}
}

export default Board;