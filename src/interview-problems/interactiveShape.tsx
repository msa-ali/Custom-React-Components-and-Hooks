import { useState, useEffect, useRef, memo } from 'react';
import Question from '../components/question';

// Use this data to create the shape
const BOX_DATA = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
];

const Box = memo(({ value, selected, xIndex, yIndex, disabled }: { value: number, selected: boolean, xIndex: number, yIndex: number, disabled: boolean }) => {
    const isHidden = value === 0;

    const bgColor = selected ? '#0bcc59' : 'none';

    const visibility = !isHidden ? 'visible' : 'hidden';

    return (
        <div
            style={{
                border: '1px solid black',
                width: '8rem',
                height: '8rem',
                background: bgColor,
                transition: 'background 2s ease',
                visibility,
                cursor: (isHidden || disabled) ? 'not-allowed' : 'pointer'
            }}
            data-x={xIndex}
            data-y={yIndex}
        />
    );
});

export default function InteractiveShape() {
    const cols = BOX_DATA[0].length;

    const [deselection, setDeselection] = useState(false);
    const [selected, setSelected] = useState(() => BOX_DATA.map(row => row.map(() => false)));

    const selectedOrderQueue = useRef<Array<string>>([]);

    const printSelectedOrder = () => {
        console.clear();
        if (!selectedOrderQueue.current.length) {
            console.log('No item selected');
            return;
        }
        selectedOrderQueue.current.forEach((index) => {
            const [i, j] = index.split(',');
            console.log(`${i}, ${j}`)
        });
    }

    const autoDeselect = async () => {
        setDeselection(true);

        console.log('Current Selection Order: ', selectedOrderQueue.current);

        for (const index of selectedOrderQueue.current) {
            const [i, j] = index.split(',');
            await new Promise((resolve) => setTimeout(resolve, 500)); // delay between each deselection
            setSelected((selected) =>
                selected.map((row, x) =>
                    row.map((value, y) => {
                        if (x === +i && y === +j) {
                            console.log(`Unselected (${i}, ${j})`);
                            return false;
                        }
                        return value;
                    })
                )
            );
        }

        selectedOrderQueue.current = [];
        setDeselection(false);
    };

    useEffect(() => {
        if (deselection) {
            return;
        }
        const allSelected = selected.every(
            (row, i) =>
                row.every((isSelected, j) => !BOX_DATA[i][j] || isSelected)
        );
        if (allSelected) {
            console.log('All items are selected. Deselecting now...');
            autoDeselect();
        }
    }, [selected, deselection]);

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        width: '24rem',
        gap: '0.5rem',
        top: '24rem'
    }

    const onBoxClick = (event: any) => {
        const target = event.target;
        const i = target.getAttribute('data-x');
        const j = target.getAttribute('data-y');
        console.log(target);
        if (deselection || i === null) {
            return;
        }

        setSelected(selected => {
            const updated = selected.map(row => row.map(val => val));
            const isSelected = !updated[i][j];
            const key = `${i},${j}`;
            if (isSelected) {
                if (!selectedOrderQueue.current.includes(key)) {
                    selectedOrderQueue.current.push(key);
                }
            } else {
                selectedOrderQueue.current = selectedOrderQueue.current.filter(value => value !== key);
            }
            updated[i][j] = isSelected;
            return updated;
        });
        // printSelectedOrder();
    }


    return (
        <main>
            <Question
                problem="In this question, the candidate needs to create a shape based on a given 2D array. A shape is a collection of empty boxes placed at values that are true in the provided array.
                Many users have reported that this question was asked in the frontend coding round of companies like Uber. You might be given a 2D array and needs to create the shape and along with interactivity or shape would be created as part of the initial code."
                requirements={[
                    <p>Create an empty box where array value is <code>1</code>.</p>,
                    <p>User can select a box. Upon selection the box background color should change to <code>#0bcc59</code>.</p>,
                    <p>Once all boxes are selected then the boxes should auto-deselect based on the order of selection.</p>,
                    'Deselection should be non-interruptible as in once started, we can\'t stop it.',
                    'During de-selection, user should not be able to select a new box as in disable any box interaction.'
                ]}
            />
            <div style={{ ...containerStyle }} onClick={onBoxClick} className='pt-8'>
                {selected.map((row, i) => {
                    return row.map((isSelected, j) => (
                        <Box
                            key={`${i}-${j}`}
                            value={BOX_DATA[i][j]}
                            selected={isSelected}
                            xIndex={i}
                            yIndex={j}
                            disabled={deselection}
                        />
                    ));
                })}
            </div>
        </main>
    );
}