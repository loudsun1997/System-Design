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
	const [redraw, forceRedraw] = useState(0);

	useEffect(() => {
		redrawCanvas(model, canvasRef.current, appRef.current);
	}, [model, redraw]);

	const handleCanvasClick = (e) => {
		const canvasRect = canvasRef.current.getBoundingClientRect();
		console.log(canvasRect);

		let x = e.clientX - canvasRect.left;
		let y = e.clientY - canvasRect.top;

		console.log(x);
		console.log(y);
		processClick(model, canvasRef.current, x, y);
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
			<button onClick={()=>{rotateGroup(0)}}>Clockwise</button>
			<button onClick={()=>{rotateGroup(1)}}>Counter Clockwise</button>
			<botton onClick={()=>{setConfig(0)}}>4x4</botton>
			<botton onClick={()=>{setConfig(1)}}>5x5</botton>
			<botton onClick={()=>{setConfig(2)}}>6x6</botton>

		</div>
  	);
}

export default App;
