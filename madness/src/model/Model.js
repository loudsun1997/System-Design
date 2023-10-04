import { config_4x4, config_5x5, config_6x6 } from './configs.js';

export class Square {
	constructor(config) {
		this.color = config.color;
		this.row = parseInt(config.row);
		this.column = parseInt(config.column);
	}
}

export class Board {
	constructor(config) {
		this.squares = [];
		this.size = parseInt(config.numColumns);
		this.selected = [];
		this.selector = null;
		this.groupSelectors = [];

		config.baseSquares.forEach((square) => {
			this.squares.push(new Square(square));
		});
	}

	isSolved () {
		return this.squares.length === 0;
	}

	removeSameColorGroup (model) {
		console.log(`removeSameColorGroup`);

		const allSameColor = this.selected?.every(square => square?.color === this.selected[0]?.color);

		if (allSameColor) {
			const colorToRemove = this.selected[0]?.color;

			while (this.selected.length) {
				this.selected.pop();
			}

			for (let i = this.squares.length - 1; i >= 0; i--) {
				if (this.squares[i]?.color === colorToRemove) {
					this.squares.splice(i, 1);
				}
			}

			if (!model.victory){
				model.moveCount++;
			}

			this.selector = null;
			this.selected = [];
		}
	}

	rotateGroup (model, direction, forceRedraw, redraw) {
		//0 for clockwise
		//1 for counter clockwise

		if( this.selected.length === 0 ) {
			return;
		}

		if (!model.victory){
			model.moveCount++;
		}

		const tempSelectedIndex = []


		//rotate the selected squares and update them in the squares array
		this.selected.forEach((square, selectedIndex) => {
			const configIndex = this.squares.findIndex((s) => {
				return s.row === square?.row && s.column === square?.column;
			});
			tempSelectedIndex.push(configIndex);
		});

		this.selected.forEach((square, selectedIndex) => {
			if( direction === 0 && tempSelectedIndex[selectedIndex] !== -1) {
				//rotate clockwise
				switch (selectedIndex) {
					case 0:
						if (this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].column += 1;
						}
					  	break;
					case 1:
						if (this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].row += 1;
						}
						break;
					case 2:
						if (this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].row -= 1;
						}
						break;
					case 3:
						if (this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].column -= 1;
						}
						break;
					default:
				  }
			} else {
				switch (selectedIndex){
					case 0:
						if ( this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].row += 1;
						}
					  	break;
					case 1:
						if ( this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].column -= 1;
						}
						break;
					case 2:
						if ( this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].column += 1;
						}
					  	break;
					case 3:
						if ( this.squares[tempSelectedIndex[selectedIndex]]) {
							this.squares[tempSelectedIndex[selectedIndex]].row -= 1;
						}
						break;
					default:
				}
			}
		}
		);


		//clear the selected squares
		this.selected = [];
		this.selector = null;


		forceRedraw(redraw + 1);
	}
}

export class Model {
	constructor() {
		this.config = [ config_4x4, config_5x5, config_6x6 ];
		this.currentConfig = 0;
		this.moveCount = 0;
		this.victory = false;
		this.board = new Board(this.config[this.currentConfig]);

	}

	checkVictory () {
		if (this.board.isSolved()) {
			this.victory = true;
		}
	}

	setConfig (configIndex) {
		this.currentConfig = configIndex;
		this.board = new Board(this.config[this.currentConfig]);
		this.moveCount = 0;
		this.victory = false;
	}

	resetConfig () {
		this.board = new Board(this.config[this.currentConfig]);
		this.moveCount = 0;
		this.victory = false;
	}
}

