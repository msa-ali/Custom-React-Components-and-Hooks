import useNavigation from "../../hooks/use-navigation";

type Props = {
    path: string;
    children: JSX.Element;
}

const Route = ({path, children}: Props) => {
    const { currentPath } = useNavigation();

    if (path === currentPath) {
        return children;
    }

    return null;
};

export default Route;