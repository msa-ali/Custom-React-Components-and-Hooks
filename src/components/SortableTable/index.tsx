import { useState } from "react";
import { GoArrowSmallDown, GoArrowSmallUp } from 'react-icons/go';

import Table, { Props as TableProps, Config as TableConfig } from "../Table";

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
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [sortBy, setSortBy] = useState<string | null>(null);

    const { config, data } = props;

    const handleClick = (label: string) => {
        
        if (sortBy && label !== sortBy) {
            setSortOrder('asc');
            setSortBy(label);
            return;
        }

        if (sortOrder === null) {
            setSortOrder('asc');
            setSortBy(label);
        } else if (sortOrder === 'asc') {
            setSortOrder('desc');
            setSortBy(label);
        } else if (sortOrder === 'desc') {
            setSortOrder(null);
            setSortBy(null);
        }
    }

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

    // only sort data if sortOrder and sortBy is not null
    // Make a copy of data prop
    // find the correct sortValue fn and use it for sorting
    let sortedData = data;
    if (sortOrder && sortBy) {
        const sortValue = config.find(column => column.label === sortBy)?.sortValue;
        if (sortValue) {
            sortedData = [...data].sort((a, b) => {
                const valueA = sortValue(a);
                const valueB = sortValue(b);

                const order = sortOrder === 'asc' ? 1 : -1;

                if (typeof valueA === 'string') {
                    return valueA.localeCompare(valueB) * order;
                } else {
                    return (valueA - valueB) * order;
                }

            })
        }
    }

    return (
        <Table {...props} data={sortedData} config={updatedConfig} />
    );
}

export default SortableTable;