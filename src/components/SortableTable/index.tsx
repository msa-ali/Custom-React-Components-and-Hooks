import { GoArrowSmallDown, GoArrowSmallUp } from 'react-icons/go';

import Table, { Props as TableProps } from "../Table";
import useSort from "../../hooks/use-sort";

export type Config<T> = Array<{
    label: string;
    header?: () => React.ReactNode;
    render: (data: T) => React.ReactNode;
    sortValue?: (data: T) => any;
}>

export interface Props<T> extends TableProps<T> {
    config: Config<T>
}

function getIcons(label: string, sortBy: string | null, sortOrder: 'asc' | 'desc' | null) {
    if (label !== sortBy || sortOrder === null) {
        return (
            <div>
                <GoArrowSmallUp />
                <GoArrowSmallDown />
            </div>
        );
    }
    if (sortOrder === 'asc') {
        return (
            <div>
                <GoArrowSmallUp />
            </div>
        );
    }
    return (
        <div>
            <GoArrowSmallDown />
        </div>
    );
}


const SortableTable = <T,>(props: Props<T>) => {
    const { config, data } = props;
    const { handleClick, sortBy, sortOrder, sortedData } = useSort(data, config);

    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
            return column;
        }
        return {
            ...column,
            header: () =>
                <th onClick={() => handleClick(column.label)} className="cursor-pointer hover:bg-gray-100 p-2">
                    <div className="flex justify-center items-center">
                        {getIcons(column.label, sortBy, sortOrder)}
                        {column.label}
                    </div>
                </th>
        }
    });



    return (
        <Table {...props} data={sortedData} config={updatedConfig} />
    );
}

export default SortableTable;