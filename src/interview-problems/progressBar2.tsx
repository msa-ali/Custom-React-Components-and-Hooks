import Question from "../components/question";
import ProgressBarComponent from "../components/progress-bar";
import { useEffect, useState } from "react";

import './progressBar.css';

const ProblemStatement = () => (
    <Question
        problem='Build an app where clicking the "Add" button adds progress bars to the page. The progress bars fill up gradually as soon as they are shown.'
        image='src/assets/progress-bars-2-example.png'
        requirements={[
            "Clicking on the \"Add\" button adds a progress bar to the page.",
            "Each progress bar start filling up smoothly as soon as they're added",
            "Each bar takes approximately 2000ms to completely fill up.",
        ]}
    />
)

const ProgressBarApproach2 = () => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(value => {
                if (value >= 100) {
                    clearInterval(interval);
                    return value;
                }
                return value + 10;
            });
        }, 100);
        () => clearInterval(interval);
    }, []);

    return <ProgressBarComponent progress={progress} progressColor="green" className="w-full" />
}

function ProgressBar() {
    const [startTransition, setStartTransition] =
      useState(false);
  
    // Start transition after first render and never
    // apply this effect ever again.
    useEffect(() => {
      if (startTransition) {
        return;
      }
  
      setStartTransition(true);
    });
  
    return (
      <div className="bar">
        <div
          className={[
            'bar-contents',
            startTransition && 'bar-contents--filled',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
    );
  }

const ProgressBar2 = () => {

    const [count, setCount] = useState<number>(0);

    const handleClick = () => {
        setCount(count => count + 1);
    }

    return (
        <div className="flex flex-col gap-4 items-start">
            <ProblemStatement />
            <button className="px-2 py-1 bg-slate-100 border border-black flex items-center" onClick={handleClick}>Add</button>
            {count}
            <p className="mx-2">Approach 1</p>
            <div className="w-full flex flex-col gap-2">
                {Array(count).fill(0).map((_, i) => {
                    return <ProgressBar key={i} />
                })}
            </div>

            <p className="mx-2">Approach 2</p>
            <div className="w-full flex flex-col gap-2">
                {Array(count).fill(0).map((_, i) => {
                    return <ProgressBarApproach2 key={i} />
                })}
            </div>
        </div>
    )
}

export default ProgressBar2;