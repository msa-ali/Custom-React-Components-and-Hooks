import { useEffect, useState } from "react";

export type DropTargetEventHandlers = {
    dragover?: (event: DragEvent) => void;
    dragenter?: (event: DragEvent) => void;
    dragleave?: (event: DragEvent) => void;
    drop?: (event: DragEvent) => void;
};

const useDropTarget = (
    ref: React.RefObject<HTMLElement>,
    { dragover, dragenter, dragleave, drop }: DropTargetEventHandlers = {},
) => {

    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        if (ref.current) {
            /* register events fired on the drop target */

            // dragover event
            const handleDragOver = (event: DragEvent) => {
                event.preventDefault();
                setIsDragOver(true);
                dragover?.(event);
            }
            ref.current.addEventListener('dragover', handleDragOver);

            // dragenter event
            const handleDragEnter = (event: DragEvent) => {
                dragenter?.(event);
            }
            ref.current.addEventListener('dragenter', handleDragEnter);

            // dragleave event
            const handleDragLeave = (event: DragEvent) => {
                setIsDragOver(false);
                dragleave?.(event);
            }
            ref.current.addEventListener('dragleave', handleDragLeave);

            // drop event
            const handleDrop = (event: DragEvent) => {
                setIsDragOver(false);
                drop?.(event);
            }
            ref.current.addEventListener('drop', handleDrop);

            /* unsubscribe drag events before unmount */
            return () => {
                ref.current?.removeEventListener('dragover', handleDragOver);
                ref.current?.removeEventListener('dragenter', handleDragEnter);
                ref.current?.removeEventListener('dragleave', handleDragLeave);
                ref.current?.removeEventListener('drop', handleDrop);
            };
        }
    }, [ref, dragover, dragenter, dragleave, drop]);

    return isDragOver;
};

export default useDropTarget;