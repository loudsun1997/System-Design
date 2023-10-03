export function processClick (model, canvas, x, y, forceRedraw, redraw) {
	//check if click is within a group selector
	//if so, select that group
	if( model.board.groupSelectors.length === 0 ) {
		return;
	}

	const group = model.board.groupSelectors.find((group) => {
		return Math.sqrt(Math.pow(group.x - x, 2) + Math.pow(group.y - y, 2)) < group.radius;
	});

	if( group ) {
		selectGroup(group, model, canvas, forceRedraw, redraw);
	}
	// console.log(group);
	// console.log(redraw);
}

export function handleReset (model, forceRedraw, redraw) {
	model.resetConfig();
	forceRedraw(redraw + 1);
}

export function rotateGroup (direction, model, forceRedraw, redraw) {
	//0 for clockwise
	//1 for counter clockwise

	model.board.rotateGroup(model, direction, forceRedraw, redraw);
}

export function setConfig (configIndex, model, forceRedraw, redraw) {
	model.setConfig(configIndex);
	forceRedraw(redraw + 1);
}

export function selectGroup (group, model, canvas, forceRedraw, redraw) {
	//push 4 squares into model.board.selected, group is the row and column of the first square
	const squareOne = model.board.squares.find((square) => {
		return square.row === group.row && square.column === group.column;
	});
	const squareTwo = model.board.squares.find((square) => {
		return square.row === group.row && square.column === group.column + 1;
	});
	const squareThree = model.board.squares.find((square) => {
		return square.row === group.row + 1 && square.column === group.column;
	});
	const squareFour = model.board.squares.find((square) => {
		return square.row === group.row + 1 && square.column === group.column + 1;
	});

	model.board.selected = [];

	model.board.selected.push(squareOne);
	model.board.selected.push(squareTwo);
	model.board.selected.push(squareThree);
	model.board.selected.push(squareFour);

	// console.log(model.board.selected)
	// console.log(redraw)
	model.board.selector = group;
	model.board.removeSameColorGroup(model);
	forceRedraw(redraw + 1);
}