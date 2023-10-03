export function redrawCanvas(model, canvas, app) {
	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const squareSize = canvas.width / model.board.size;

	ctx.lineWidth = 2;
	ctx.strokeStyle = 'black';
	const size = model.board.size;
	for( let i = 0; i <= size; i++ ) {
		ctx.beginPath();
		ctx.moveTo(0, i * squareSize);
		ctx.lineTo(canvas.width, i * squareSize);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(i * squareSize, 0);
		ctx.lineTo(i * squareSize, canvas.height);
		ctx.stroke();
	}

	model.checkVictory();
	if (model.victory) {
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = '48px serif';
		ctx.fillStyle = 'black';
		ctx.fillText('Victory!', canvas.width / 3, canvas.height / 2);
		return;
	}

	model.board.squares.forEach((square) => {
		ctx.fillStyle = square.color;
		ctx.fillRect(square.column * squareSize, square.row * squareSize, squareSize, squareSize);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.strokeRect(square.column * squareSize, square.row * squareSize, squareSize, squareSize);
	});

	model.board.groupSelectors = [];

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

			if (model.board.selector && model.board.selector.row === j - 1 && model.board.selector.column === i - 1) {
				ctx.fillStyle = 'red';
				ctx.beginPath();
				ctx.arc(x, y, 15, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
			}

			model.board.groupSelectors.push({x: x, y: y, radius: 15, row: j - 1, column: i - 1});
		}
	}

	ctx.strokeStyle = 'red';
	ctx.lineWidth = 10;
	if (model.board.selector) {
		ctx.strokeRect(model.board.selector.column * squareSize, model.board.selector.row * squareSize, squareSize * 2, squareSize * 2);
	}


	console.log("redrew canvas")
}