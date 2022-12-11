import classNames from "classnames";
import { Appearance } from "./types";

export const getClasses = (appearance: Appearance, outline?: boolean, rounded?: boolean, className?: string) => {
    const primary = appearance === 'primary';
    const secondary = appearance === 'secondary';
    const success = appearance === 'success';
    const warning = appearance === 'warning';
    const danger = appearance === 'danger';
    const classes = classNames(className, 'flex items-center px-3 py-1.5 border', {
        'bg-blue-500 border-blue-600 text-white': primary,
        'bg-gray-900 border-gray-900 text-white': secondary,
        'bg-green-500 border-green-500 text-white': success,
        'bg-yellow-400 border-yellow-400 text-white': warning,
        'bg-red-500 border-red-500 text-white': danger,
        'rounded-full': rounded,
        'bg-white text-gray-900': outline,
        'text-blue-500': outline && primary,
        'text-gray-900': outline && secondary,
        'text-green-500': outline && success,
        'text-yellow-400': outline && warning,
        'text-red-500': outline && danger,
    });
    return classes;
}