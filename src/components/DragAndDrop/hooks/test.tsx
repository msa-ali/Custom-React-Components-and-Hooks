import { useRef } from "react";
import tw from "tailwind-styled-components";

import useDraggableTarget from "./useDraggableTarget";
import useDropTarget from "./useDropTarget";
import JiraCard from "../jira-board/jira-card";
import JiraBoard from "../jira-board";

const Container = tw.div`
    flex
    items-center
    justify-center
    flex-col
    w-full
`

interface DropContainerProps {
    $isDragOver: boolean
}

interface DragContainerProps {
    $isDragging: boolean;
}

const DragContainer = tw.div<DragContainerProps>`
    ${(p) => p.$isDragging ? "opacity-20" : ""}
`;


const DropContainer = tw.div<DropContainerProps>`
    p-4 mt-4 w-32 h-16 border-2 border-dotted
    ${(p) => p.$isDragOver ? "animate-bounce" : ""}
`;

const DragTargetTest = () => {

    const dragTargetRef = useRef<HTMLDivElement>(null);
    const dropTargetRef = useRef<HTMLDivElement>(null);

    const isDragging = useDraggableTarget(dragTargetRef);
    const isDragOver = useDropTarget(dropTargetRef);

    return (
        <Container>
            <JiraBoard />
        </Container>
    );
};

export default DragTargetTest;