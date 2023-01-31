import { useEffect, useState } from "react";

const useCounter = (initialCount: number) => {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        console.log(count);
    }, [count]);

    const increment = () => setCount(count => count + 1);

    return {count, increment};
}

export default useCounter;