import { Props } from './types';
import { getClasses } from './utils';

const Button = ({
    children,
    appearance = 'primary',
    rounded,
    outline,
    className,
    ...props
}: Props) => {
    return (
        <button
            {...props}
            className={getClasses(appearance, outline, rounded, className)}
        >
            {children}
        </button>
    );
};

export default Button;