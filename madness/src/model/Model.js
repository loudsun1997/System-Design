import { config_4x4, config_5x5, config_6x6 } from './configs.js';

export class Square {
	constructor(config) {
		this.color = config.color;
		this.row = parseInt(config.row);
		this.column = parseInt(config.column);
	}
}

export class Group {
	constructor() {
		this.row = 0;
		this.column = 0;
	}
}

export class location {
	constructor() {
		this.x = 0;
		this.y = 0;
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

	rotateGroup (direction, forceRedraw, redraw) {
		//0 for clockwise
		//1 for counter clockwise
		console.log('something rotateGroup')

		if( this.selected.length === 0 ) {
			return;
		}

		const tempSelectedIndex = []


		//rotate the selected squares and update them in the squares array
		this.selected.forEach((square, selectedIndex) => {
			const configIndex = this.squares.findIndex((s) => {
				return s.row === square?.row && s.column === square?.column;
			});
			console.log(configIndex);
			tempSelectedIndex.push(configIndex);
		});

		this.selected.forEach((square, selectedIndex) => {
			if( direction === 0 && tempSelectedIndex[selectedIndex] !== -1) {
				//rotate clockwise
				switch (selectedIndex) {
					case 0:
					  	this.squares[tempSelectedIndex[selectedIndex]].column += 1;
						console.log(`case 0`);
					  	break;
					case 1:
						this.squares[tempSelectedIndex[selectedIndex]].row += 1;
						console.log(`case 1`);
						break;
					case 2:
						this.squares[tempSelectedIndex[selectedIndex]].row -= 1;
					  	break;
					case 3:
						this.squares[tempSelectedIndex[selectedIndex]].column -= 1;
						break;
					default:
					  console.log(`Sorry`);
				  }
			} else {
				switch (selectedIndex){
					case 0:
						this.squares[tempSelectedIndex[selectedIndex]].row += 1;
					  	break;
					case 1:
						this.squares[tempSelectedIndex[selectedIndex]].column -= 1;
						break;
					case 2:
						this.squares[tempSelectedIndex[selectedIndex]].column += 1;
					  	break;
					case 3:
						this.squares[tempSelectedIndex[selectedIndex]].row -= 1;
						break;
					default:
					  console.log(`Sorry`);
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
}

