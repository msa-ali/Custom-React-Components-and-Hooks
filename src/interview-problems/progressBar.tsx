import Question from "../components/question";
import ProgressBarComponent from "../components/progress-bar";

const ProblemStatement = () => (
    <Question
        problem='Implement a progress bar component which shows the completion progress by filling the bar proportionately to the progress (a number between 0-100, inclusive).'
        image='src/assets/progress-bar-example.png'
        requirements={[
            <p>The filled bar can be of any color. The example uses <code>#c5c5c5</code> for the background color and <code>#0d6efd</code> for the progress color.</p>,
            <p>The completion % is shown in the center of the filled bar.</p>
        ]}
    />
)

const ProgressBar = () => {
    return (
        <div className="flex flex-col gap-4">
            <ProblemStatement />
            <h3 className="text-xl">Solution</h3>
            <ProgressBarComponent progress={0} showText />
            <ProgressBarComponent progress={25} showText />
            <ProgressBarComponent progress={50} showText />
            <ProgressBarComponent progress={75} showText />
            <ProgressBarComponent progress={100} showText/>
        </div>
    )
}

export default ProgressBar;