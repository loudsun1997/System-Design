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

	//draw bounding box around 4 squares
	// ctx.strokeStyle = 'black';
	// ctx.lineWidth = 10;
	// ctx.strokeRect(0, 0, squareSize * 4, squareSize * 4);

	//draw group selectors
	
	for( let group in model.board.selected ) {
		console.log(group);
		const x = model.board.groupSelectors[group].x;
		const y = model.board.groupSelectors[group].y;
		const radius = model.board.groupSelectors[group].radius;

		ctx.lineWidth = 5;
		ctx.strokeStyle = 'red';
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
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