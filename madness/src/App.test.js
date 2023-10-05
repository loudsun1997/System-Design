import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Model, Board } from './model/Model';
import { config_4x4 } from './model/configs';
import * as TestConfigs from './TestConfigs';
import { processClick, handleReset, rotateGroup, setConfig, selectGroup } from './controller/Controller';
import { redrawCanvas } from './boundary/Boundary';

describe('Model', () => {
    let model;

    beforeEach(() => {
        model = new Model();
    });

    test('Model constructor initializes properties correctly', () => {
        expect(model.currentConfig).toEqual(0);
        expect(model.moveCount).toEqual(0);
        expect(model.victory).toEqual(false);
        expect(model.board).toBeDefined();
    });

    test('checkVictory sets victory to true when board is solved', () => {
        model.board.squares = [];
        model.checkVictory();
        expect(model.victory).toEqual(true);
    });

    test('setConfig updates currentConfig and resets board', () => {
        model.setConfig(1);
        expect(model.currentConfig).toEqual(1);
        expect(model.board).toBeDefined();
        expect(model.moveCount).toEqual(0);
        expect(model.victory).toEqual(false);
    });

    test('resetConfig resets the board, moveCount, and victory', () => {
        model.moveCount = 5;
        model.victory = true;
        model.resetConfig();
        expect(model.board).toBeDefined();
        expect(model.moveCount).toEqual(0);
        expect(model.victory).toEqual(false);
    });
});

describe('Board', () => {
    let board;
    let model;

    beforeEach(() => {
        const config = config_4x4;
        board = new Board(config);
        model = new Model();
    });

    test('removeSameColorGroup removes squares of the same color', () => {
        board.selected = TestConfigs.removeSameColorGroupSelected;
		board.squares = TestConfigs.fourByFourReadyToRemoveBlue;

        board.removeSameColorGroup(model);
        expect(board.squares).toEqual(TestConfigs.fourByFourBlueRemoved);
    });

    test('rotateGroup rotates selected squares', () => {
        board.selected = [
            { color: 'red', row: 1, column: 1 },
            { color: 'blue', row: 2, column: 2 }
        ];
        const forceRedraw = jest.fn();
        board.rotateGroup(model, 0, forceRedraw, 1);
        expect(forceRedraw).toHaveBeenCalled();
    });
});

describe('Controllers', () => {
    let model;
    let forceRedraw;
    let redraw;

    beforeEach(() => {
        model = new Model();
        forceRedraw = jest.fn();
        redraw = 1;
    });

    test('processClick selects a group if click is within a group selector', () => {
        model.board.groupSelectors = [{ x: 10, y: 10, radius: 5 }];
        processClick(model, null, 11, 11, forceRedraw, redraw);
        expect(forceRedraw).toHaveBeenCalled();
    });

    test('handleReset resets the model configuration', () => {
        handleReset(model, forceRedraw, redraw);
        expect(forceRedraw).toHaveBeenCalled();
    });

    test('rotateGroup calls board\'s rotateGroup method', () => {
        const spy = jest.spyOn(model.board, 'rotateGroup');
        rotateGroup(0, model, forceRedraw, redraw);
        expect(spy).toHaveBeenCalled();
    });

    test('setConfig sets the model configuration', () => {
        setConfig(1, model, forceRedraw, redraw);
        expect(model.currentConfig).toEqual(1);
        expect(forceRedraw).toHaveBeenCalled();
    });

    test('selectGroup selects the correct squares based on the group', () => {
        const group = { row: 1, column: 1 };
        selectGroup(group, model, null, forceRedraw, redraw);
        expect(model.board.selected.length).toEqual(4);
        expect(forceRedraw).toHaveBeenCalled();
    });
});

describe('redrawCanvas', () => {
    let model;
    let canvas;
    let ctx;
    let app;

    beforeEach(() => {
        model = new Model();
        ctx = {
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            stroke: jest.fn(),
            fillRect: jest.fn(),
            fillText: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            strokeRect: jest.fn()
        };
        canvas = {
            getContext: jest.fn(() => ctx),
            width: 400,
            height: 400
        };
        app = {}; // Mock any necessary properties/methods of app if needed
    });

    test('redraws the canvas based on the model state', () => {
        redrawCanvas(model, canvas, app);

        // Check if the canvas was cleared
        expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);

        // Check if the grid lines were drawn
        expect(ctx.moveTo).toHaveBeenCalled();
        expect(ctx.lineTo).toHaveBeenCalled();
        expect(ctx.stroke).toHaveBeenCalled();

        // ... Add more assertions based on the logic of redrawCanvas ...

        // Check if the victory message was displayed if model.victory is true
        model.victory = true;
        redrawCanvas(model, canvas, app);
        expect(ctx.fillText).toHaveBeenCalledWith('Victory!', canvas.width / 3, canvas.height / 2);
    });

});

describe('App', () => {
	    // Mock canvas context
		const mockCanvasContext = {
			clearRect: jest.fn(),
			beginPath: jest.fn(),
			moveTo: jest.fn(),
			lineTo: jest.fn(),
			stroke: jest.fn(),
			fillRect: jest.fn(),
			fillText: jest.fn(),
			arc: jest.fn(),
			fill: jest.fn(),
			strokeRect: jest.fn(),
			// ... any other methods you use on the canvas context ...
		};

		// Mock useRef
		const mockCanvasRef = {
			current: {
				getContext: jest.fn(() => mockCanvasContext),
				width: 600,
				height: 600,
				getBoundingClientRect: jest.fn(() => ({
					top: 0,
					left: 0,
					right: 600,
					bottom: 600,
				})),
			},
		};

		const mockAppRef = {
			current: {}
		};

		// Mock useRef to return mockCanvasRef and mockAppRef in sequence
		jest.mock('react', () => {
			const originalReact = jest.requireActual('react');
			return {
				...originalReact,
				useRef: jest.fn()
					.mockReturnValueOnce(mockCanvasRef)
					.mockReturnValueOnce(mockAppRef)
			};
		});

    test('renders App component', () => {
        const { getByText, getByTestId } = render(<App />);

        // Check if the canvas is rendered
        const canvas = getByTestId('canvas');
        expect(canvas).toBeInTheDocument();

        // Simulate a click on the canvas
        fireEvent.click(canvas);
        // ... Add assertions based on the expected behavior after clicking the canvas ...

        // Simulate a click on the Reset button
        const resetButton = getByText('Reset');
        fireEvent.click(resetButton);
        // ... Add assertions based on the expected behavior after clicking the Reset button ...

        // ... Continue with similar tests for other buttons ...

        // Check the move count
        const moveCount = getByTestId('moveCount');
        expect(moveCount.value).toBe('0'); // Assuming the initial move count is 0
    });
});