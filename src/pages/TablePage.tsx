import Table, { Config } from '../components/Table';

type Data = {
    name: string;
    color: string;
    score: number;
};

const data: Data[] = [
    { name: 'Orange', color: 'bg-orange-500', score: 5, },
    { name: 'Apple', color: 'bg-red-500', score: 3, },
    { name: 'Banana', color: 'bg-yellow-500', score: 1, },
    { name: 'Lime', color: 'bg-green-500', score: 4, },
];

const config: Config<Data> = [
    { label: 'Name', render: d => d.name },
    {
        label: 'Color', render: d => {
            const coloredCell = `p-3 m-2 ${d.color}`
            return <div className={coloredCell}></div>;
        },
    },
    { label: 'Score', render: d => d.score }
];

function TablePage() {
    return (
        <div><Table data={data} config={config} keyFn={data => data.name} /></div>
    )
}

export default TablePage