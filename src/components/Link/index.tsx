import classNames from "classnames";
import useNavigation from "../../hooks/use-navigation";

const Link = ({ to, children, className, activeClassName }: { to: string, children: React.ReactNode, className?: string, activeClassName?: string }) => {
    const { navigate, currentPath } = useNavigation();

    const handleClick = (event: any) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();
        navigate(to);
    };

    const classes = classNames("text-blue-500", "cursor-pointer", "hover:underline", className, currentPath === to && activeClassName);

    return (
        <a
            href={to}
            onClick={handleClick}
            className={classes}>
            {children}
        </a>
    );
}

export default Link;