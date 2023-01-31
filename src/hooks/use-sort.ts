import { useState } from "react";
import { Config } from "../components/SortableTable";

export type SortingOrder = 'asc' | 'desc' | null;

const useSort = <T,>(data: T[], config: Config<T>) => {
    const [sortOrder, setSortOrder] = useState<SortingOrder>(null);
    const [sortBy, setSortBy] = useState<string | null>(null);

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

    return {sortOrder, sortBy, sortedData, handleClick};
};

export default useSort;