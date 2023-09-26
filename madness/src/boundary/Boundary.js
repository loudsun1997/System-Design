export function redrawCanvas(model, canvas, app) {
	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const squareSize = canvas.width / model.board.size;

	model.board.squares.forEach((square) => {
		ctx.fillStyle = square.color;
		ctx.fillRect(square.column * squareSize, square.row * squareSize, squareSize, squareSize);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.strokeRect(square.column * squareSize, square.row * squareSize, squareSize, squareSize);
	});

	//draw bounding box around 4 squares model.board.selected[0] and model.board.selected[3]
	ctx.strokeStyle = 'red';
	ctx.lineWidth = 10;
	if (model.board.selector) {
		ctx.strokeRect(model.board.selector.column * squareSize, model.board.selector.row * squareSize, squareSize * 2, squareSize * 2);
	}

	for( let i = 1; i <= model.board.size - 1; i++ ) {
		for( let j = 1; j <= model.board.size - 1; j++ ) {
			const x = (canvas.width / model.board.size) * i;
			const y = (canvas.height / model.board.size) * j;

			ctx.lineWidth = 2;
			ctx.strokeStyle = 'black';
			ctx.fillStyle = 'white';
			ctx.beginPath();
			ctx.arc(x, y, 15, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();

			model.board.groupSelectors.push({x: x, y: y, radius: 15, row: j - 1, column: i - 1});

		}
	}

}