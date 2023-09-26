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
		this.groupSelectors = [];

		config.baseSquares.forEach((square) => {
			this.squares.push(new Square(square));
		});
	}

	rotateGroup (direction) {
		//0 for clockwise
		//1 for counter clockwise
		if( this.selected.length === 0 ) {
			return;
		}

		this.selected.forEach((square) => {
			if( direction === 0 ) {
				//rotate clockwise
				let temp = square.row;
				square.row = square.column;
				square.column = this.size - temp - 1;
			} else {
				//rotate counter clockwise
				let temp = square.row;
				square.row = this.size - square.column - 1;
				square.column = temp;
			}
		});
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

