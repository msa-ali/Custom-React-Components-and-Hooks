import Button from '../components/button';
import useCounter from '../hooks/use-counter';

function CounterPage({ initialCount }: { initialCount: number }) {
    const { count, increment } = useCounter(initialCount);

    return (
        <div className='p-2'>
            <h1 className='mb-2'>Count is : {count}</h1>
            <Button onClick={increment}>Increment</Button>
        </div>
    )
}

export default CounterPage