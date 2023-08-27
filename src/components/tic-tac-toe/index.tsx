import { memo, useEffect, ReactNode } from "react";
import classNames from "classnames";
import React from "react";
import useTicTacToe, { Player } from "./useTicTacToe";

function Circle() {
    return (
        <div className="bg-white rounded-full w-24 h-24">
        </div>
    )
}

function Cross() {
    return (
        <div className="font-bold text-8xl text-gray-600">X</div>
    )
}


type Cell = {
    x: number;
    y: number;
    value?: Player;
    className?: string;
    onClick: (x: number, y: number) => void;
    disabled?: boolean;
}

const TicTacToeCell = memo(({ className, x, y, value, onClick, disabled }: Cell) => {
    let classes = classNames('w-40 h-40 flex justify-center items-center border-white shadow-xl', className);
    if (x < 2) {
        classes = classNames(classes, 'border-b-8');
    }
    if (y < 2) {
        classes = classNames(classes, 'border-r-8');
    }
    if (disabled) {
        classes = classNames(classes, 'cursor-not-allowed');
    }
    let children: React.ReactNode = null;
    if (value) {
        if (value === 'player1') {
            children = <Circle />;
        } else {
            children = <Cross />
        }
    }

    const handleClick = () => onClick(x, y);
    return <div className={classes} onClick={handleClick}>
        <span className="text-8xl">{children}</span>
    </div>
});

function TicTacToe() {
    const { currentPlayer, gameState, handlePlay, winner, handleRestart } = useTicTacToe();
    useEffect(() => {
        console.log(currentPlayer);
    }, [currentPlayer]);

    const gridCells = gameState.map((row, x) => row.map((column, y) => (
        <TicTacToeCell
            key={`(${x},${y})`}
            x={x}
            y={y}
            value={gameState[x][y]}
            onClick={handlePlay}
            disabled={!!winner || !!gameState[x][y]}
        />
    ))).flat(1);

    let header: ReactNode;
    if (winner === 'Draw') {
        header = <div className="mt-2"><span className="font-bold">Result: </span>Draw</div>
    } else if (winner !== undefined) {
        header = <div className="mt-2"><span className="font-bold">Winner: </span>{winner}</div>
    } else {
        header = <div className="mt-2"><span className="font-bold">Turn: </span>{currentPlayer}</div>
    }

    return (
        <div className="w-full flex flex-col gap-8 justify-center items-center">
            {header}
            <div className="grid grid-cols-3">
                {gridCells}
            </div>
            <span><a className="p-2 border-2 border-blue-500 text-blue-600 font-semibold rounded-md" onClick={handleRestart}>Restart game</a></span>
        </div>
    )
}

export default TicTacToe