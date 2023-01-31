import { ReactNode } from "react";

export type Config<T> = {
    label: string;
    render: (data: T) => ReactNode;
    sort?: (a: T, b: T) => number;
}[]

interface Props<T> {
    data: Array<T>;
    config: Config<T>;
    keyFn: (data: T) => string;
}

function Table<T>({ data, config, keyFn }: Props<T>) {

    const renderedRows = data.map((row: T) => {
        
        return (
            <tr key={keyFn(row)} className="border-b">
                {config.map(c => (
                    <td className="p-3">{c.render(row)}</td>
                ))}
            </tr>
        );
    });

    const renderedHeaders = config.map(({label}) => <th>{label}</th>);

    return (
        <table className="table-auto border-spacing-2">
            <thead>
                <tr className="border-b-2">
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table>
    )
}

export default Table