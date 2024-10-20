type Props = {
    progress: number;
    progressColor?: string;
    background?: string;
    className?: string;
}

const ProgressBar = ({ progress, progressColor, className }: Props) => {
    return (
        <div className={`bg-slate-300 w-1/2 h-4 rounded-md ${className}`}>
            <div className="bg-blue-500 rounded-md flex flex-row justify-center items-center h-full" style={{width: `${progress}%`}}>
                <p className="text-xs text-gray-100">{progress ? `${progress}%` : null}</p>
            </div>
        </div>
    )
};

export default ProgressBar;