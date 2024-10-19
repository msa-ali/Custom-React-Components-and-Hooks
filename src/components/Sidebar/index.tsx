import Link from "../link";

const links: { label: string, path: string }[] = [
    { label: 'Dropdown', path: '/' },
    { label: 'Accordion', path: '/accordion' },
    { label: 'Buttons', path: '/buttons' },
    { label: 'Modal', path: '/modal' },
    { label: 'Table', path: '/table' },
    { label: 'Counter', path: '/counter', },
    { label: 'Drag and Drop', path: '/drag-and-drop', },
    { label: 'Tic Tac Toe', path: '/tic-tac-toe', },
    { label: 'Interactive Shape', path: '/interactive-shape' }
];

const Sidebar = () => {
    const renderedLinks = links.map(link => {
        return (
            <Link
                key={link.label}
                to={link.path}
                className="mb-3 p-2"
                activeClassName="border-l-4 border-blue-500 font-semibold"
            >
                {link.label}
            </Link>
        );
    });

    return (
        <div className="sticky top-0 overflow-y-scroll flex flex-col items-start">
            {renderedLinks}
        </div>
    );
}

export default Sidebar;