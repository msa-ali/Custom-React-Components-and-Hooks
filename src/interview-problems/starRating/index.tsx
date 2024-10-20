import { memo, useCallback, useRef, useState } from "react";

const activeStar = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="star-icon star-icon-filled"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
    </svg>
);

const inactiveStar = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="star-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
    </svg>
);

type StarRatingProps = { 
    active: boolean, 
    index: number,
    onClick: (index: number) => void,
    onHover: (index: number) => void,
    onHoverLeave: () => void;
};

const StarRating = memo(({ active, index, onHover, onHoverLeave, onClick }: StarRatingProps ) => {
    return (
        <div 
            data-index={index} 
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHoverLeave()}
            onClick={() => onClick(index)}
        >
            {active ? activeStar : inactiveStar}
        </div>
    );
})

type Props = {
    total: number;
    selected: number;
};

const Rating = ({ total, selected }: Props) => {
    const getInitialState = () => Array(total)
        .fill(false)
        .map((_, i) => i <= selected - 1)

    const [stars, setStars] = useState(getInitialState);
    const actualStarState = useRef(getInitialState());

    const updateStarStar = useCallback((state: boolean[], index: number) => {
        if (index >= state.length) {
            return state;
        }
        return state.map((_, i) => i <= index);
    }, []);

    const onHover = useCallback((index: number) => {
        setStars(stars => updateStarStar(stars, index));
    }, []);

    const onHoverLeave = useCallback(() => {
        setStars(actualStarState.current);
    }, []);

    const onClick = useCallback((index: number) => {
        setStars(stars => {
            const updatedState = updateStarStar(stars, index);
            actualStarState.current = updatedState;
            return updatedState;
        });
    }, []);


    return (
        <>
            <div className="flex flex-row items-center gap-x-0.5">
                {stars.map((active, index) => {
                    return (
                        <StarRating
                            key={index}
                            active={active}
                            index={index}
                            onHover={onHover}
                            onHoverLeave={onHoverLeave}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </>

    );
}

export default Rating;