import { useCallback, useState } from 'react';

export type Player = 'player1' | 'player2';

const getInitialGameState = (): (Player | undefined)[][] => Array(3)
    .fill(0)
    .map(_ => Array(3).fill(0).map(() => undefined))

function getWinner(state: (Player | undefined)[][], currentPlayer: Player): Player | 'Draw' | undefined {
    const checkRowValue = state.some(row => row.every(cell => cell === currentPlayer));
    if (checkRowValue) {
        return currentPlayer;
    }
    for (let i = 0; i < 3; i++) {
        const checkColumnValue = state.map(row => row[0]).every(value => value === currentPlayer);
        if (checkColumnValue) {
            return currentPlayer
        }
    }
    // check diagonal - 1
    if (
        state[0][0] === currentPlayer &&
        state[1][1] === state[0][0] &&
        state[2][2] === state[1][1]
    ) {
        return currentPlayer;
    }
    // check diagonal - 2
    if (
        state[0][2] === currentPlayer &&
        state[1][1] === state[0][2] &&
        state[2][0] === state[1][1]
    ) {
        return currentPlayer;
    }
    if (state.every(row => row.every(cell => cell !== undefined))) {
        return 'Draw';
    }
}

const toggleCurrentPlayer = (player: Player) => player === 'player1' ? 'player2' : 'player1';

export const useTicTacToe = () => {
    const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
    const [winner, setWinner] = useState<Player | 'Draw' | undefined>();

    const [state, setState] = useState(getInitialGameState);

    const togglePlayer = useCallback(() => {
        setCurrentPlayer(player => toggleCurrentPlayer(player));
    }, []);

    const handlePlay = useCallback((x: number, y: number) => {
        if (state[x][y] !== undefined || winner !== undefined) {
            return;
        }
        const updatedState = [...state];
        state[x][y] = currentPlayer;
        setState(updatedState);
        togglePlayer();
        setWinner(getWinner(state, currentPlayer));
    }, [state, currentPlayer, togglePlayer]);

    const handleRestart = useCallback(() => {
        setCurrentPlayer('player1');
        setState(getInitialGameState());
        setWinner(undefined);
    }, []);

    return { currentPlayer, handlePlay, gameState: state, winner, handleRestart };
}

export default useTicTacToe;