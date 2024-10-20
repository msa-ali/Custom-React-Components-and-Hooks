type Props = {
    problem: React.ReactNode;
    requirements?: React.ReactNode[];
    extraInfo?: React.ReactNode;
    image?: string;
}

const Question = ({ problem, requirements, extraInfo, image }: Props) => {

    const requirementNodes = requirements ? (
        <div className="my-4">
            <h2 className="text-xl mb-2 font-semibold">Requirements</h2>
            <ul className="list-disc">
                {requirements.map((requirement, i) => <li key={i}>{requirement}</li>)}
            </ul>
        </div>
    ) : null;

    return (
        <div className="m-4">
            <h2 className="text-xl mb-2 font-bold">Problem Statement</h2>
            <p className="mb-2">{problem}</p>
            {image && <img src={image} alt="screenshot" className="w-96 h-32" />}
            {requirementNodes}
            {extraInfo && <p>{extraInfo}</p>}
        </div>
    )
};

export default Question;