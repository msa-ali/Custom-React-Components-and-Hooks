type Props = {
    progress: number;
    progressColor?: string;
    background?: string;
    className?: string;
    showText?: boolean;
    contentClassName?: string;
}

const ProgressBar = ({ progress, progressColor, className, showText, contentClassName }: Props) => {
    const width = Math.min(Math.max(progress, 0), 100);

    const innerStyles: Record<string, string> = {
        width: `${progress}%`
    }
    if (progressColor) {
        innerStyles.background = progressColor;
    }

    return (
        <div className={`bg-slate-300 w-1/2 h-4 rounded-md ${className}`}>
            <div className={`bg-blue-500 rounded-md flex flex-row justify-center items-center h-full ${contentClassName}`} style={innerStyles}>
                <p className="text-xs text-gray-100">{progress && showText ? `${width}%` : null}</p>
            </div>
        </div>
    )
};

export default ProgressBar;