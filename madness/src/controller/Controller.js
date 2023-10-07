export function processClick (model, canvas, x, y, forceRedraw, redraw) {

	if( model.board.groupSelectors.length === 0 ) {
		return;
	}

	const group = model.board.groupSelectors.find((group) => {
		return Math.sqrt(Math.pow(group.x - x, 2) + Math.pow(group.y - y, 2)) < group.radius;
	});

	if( group ) {
		selectGroup(group, model, canvas, forceRedraw, redraw);
	}
}

export function handleReset (model, forceRedraw, redraw) {
	model.resetConfig();
	forceRedraw(redraw + 1);
}

export function rotateGroup (direction, model, forceRedraw, redraw) {
	model.board.rotateGroup(model, direction, forceRedraw, redraw);
}

export function setConfig (configIndex, model, forceRedraw, redraw) {
	model.setConfig(configIndex);
	forceRedraw(redraw + 1);
}

export function selectGroup (group, model, canvas, forceRedraw, redraw) {
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


	model.board.selector = group;
	model.board.removeSameColorGroup(model);
	forceRedraw(redraw + 1);
}