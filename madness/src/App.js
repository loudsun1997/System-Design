import logo from './logo.svg';
import './App.css';
import { useRef, useState, useEffect } from 'react';
import { Model } from './model/Model';
import { redrawCanvas } from './boundary/Boundary';
import { processClick,
	handleReset,
	rotateGroup,
	setConfig,
 } from './controller/Controller';

function App() {
	const canvasRef = useRef(null);
	const appRef = useRef(null);
	const [model, setModel] = useState(new Model());
	const [redraw, forceRedraw] = useState(1);

	useEffect(() => {
		redrawCanvas(model, canvasRef.current, appRef.current);
	}, [model, redraw]);

	const handleCanvasClick = (e) => {
		const canvasRect = canvasRef.current.getBoundingClientRect();

		let x = e.clientX - canvasRect.left;
		let y = e.clientY - canvasRect.top;

		processClick(model, canvasRef.current, x, y, forceRedraw, redraw);
	}

  	return (
		<div className="App">
			<canvas
				id="canvas"
				tabIndex={1}
				ref={canvasRef}
				width="600"
				height="600"
				onClick={handleCanvasClick}>
			</canvas>
			<button onClick={(e)=>{handleReset()}}>Reset</button>
			<button onClick={()=>{rotateGroup(0, model, forceRedraw, redraw)}}>Clockwise</button>
			<button onClick={()=>{rotateGroup(1, model, forceRedraw, redraw)}}>Counter Clockwise</button>
			<button onClick={()=>{setConfig(0)}}>4x4</button>
			<button onClick={()=>{setConfig(1)}}>5x5</button>
			<button onClick={()=>{setConfig(2)}}>6x6</button>

		</div>
  	);
}

export default App;
