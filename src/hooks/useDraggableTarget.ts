import { useEffect, useState } from "react";

export type DraggableTargetEventHandlers = {
    drag?: (event: DragEvent) => void;
    dragstart?: (event: DragEvent) => void;
    dragend?: (event: DragEvent) => void;
};


const useDraggableTarget = (
    ref: React.RefObject<HTMLDivElement>,
    { drag, dragstart, dragend }: DraggableTargetEventHandlers = {},
) => {
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (ref.current) {
            // set the draggable attribute to true to make it draggable
            ref.current.setAttribute('draggable', "true");

            /* register events fired on the draggable target */

            // drag event
            drag && ref.current.addEventListener('drag', drag);

            // dragstart event
            const handleDragStart = (event: DragEvent) => {
                setIsDragging(true);
                dragstart?.(event);
            }
            ref.current.addEventListener('dragstart', handleDragStart);

            // dragend event
            const handleDragEnd = (event: DragEvent) => {
                setIsDragging(false);
                dragend?.(event);
            }
            ref.current.addEventListener('dragend', handleDragEnd);

            /* unsubscribe drag events before unmount */
            return () => {
                drag && ref.current?.removeEventListener('drag', drag);
                ref.current?.removeEventListener('dragstart', handleDragStart);
                ref.current?.removeEventListener('dragend', handleDragEnd);
            };
        }
    }, [ref, drag, dragstart, dragend]);

    return isDragging;
};

export default useDraggableTarget;