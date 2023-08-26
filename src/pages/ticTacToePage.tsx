import TicTacToe from "../components/tic-tac-toe";

function TicTacToePage() {
    return (
        <div className="flex flex-col justify-center items-center h-full bg-blue-200">
            <div className="flex justify-between items-center my-8">
                <TicTacToe />
            </div>
        </div>
    )
}

export default TicTacToePage