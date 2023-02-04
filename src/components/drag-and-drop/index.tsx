import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const DnDContext = createContext<any>(null);
const DnDContextSetter = createContext<any>(null);

const DnDContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [dropTarget, setDropTarget] = useState('');
    return (
        <DnDContextSetter.Provider value={setDropTarget}>
            <DnDContext.Provider value={dropTarget}>
                {children}
            </DnDContext.Provider>
        </DnDContextSetter.Provider>
    );
}

const Card = ({ value, group, onDragComplete }: { value: any, group: string, onDragComplete: (value: number) => void }) => {
    const dropTarget = useContext(DnDContext);
    const setDropTarget = useContext(DnDContextSetter);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onDragStart = (ev: DragEvent) => {
            if (ref.current) {
                ref.current.style.opacity = "0.4";
                if (ev.dataTransfer) {
                    ev.dataTransfer.effectAllowed = "move";
                    ev.dataTransfer.setData('text', JSON.stringify({ group, value }));
                }
            }
        }
        const onDragEnd = (ev: DragEvent) => {
            if (ref.current) {
                ref.current.style.opacity = "1";
                console.log(group);
                dropTarget !== group && dropTargets.includes(dropTarget) && onDragComplete(value);
                setDropTarget("");
            }
        }

        const onDragOver = (ev: DragEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            return false;
        }

        ref.current?.addEventListener('dragstart', onDragStart);
        ref.current?.addEventListener('dragend', onDragEnd);
        ref.current?.addEventListener('dragover', onDragOver);


        return () => {
            ref.current?.removeEventListener('dragstart', onDragStart);
            ref.current?.removeEventListener('dragend', onDragEnd);
            ref.current?.removeEventListener('dragover', onDragOver);
        }
    }, [dropTarget]);

    return (
        <div ref={ref} draggable className="w-32 h-20 text-gray-700 flex justify-center items-center shadow-xl border bg-white">
            {value}
        </div>
    );
};

const DraggableList = ({ title, getInitialValues, }: { title: string, getInitialValues: () => any[] }) => {

    const [list, setList] = useState(getInitialValues);
    const setDropTarget = useContext(DnDContextSetter);
    const ref = useRef<HTMLDivElement>(null);

    const onDragComplete = (value: number) => setList(list => list.filter(item => item !== value));

    useEffect(() => {
        function onDrop(ev: DragEvent) {
            ev.stopPropagation();
            console.log("Dropped");

            const { group, value } = JSON.parse(ev.dataTransfer?.getData('text') || "");
            if (value && group !== title && !list.find(item => item === value)) {
                setList(list => [...list, value]);
            }
            setDropTarget(title);
            return false;
        }
        ref.current?.addEventListener('drop', onDrop);
        return () => {
            ref.current?.removeEventListener('drop', onDrop);
        };
    });

    return (
        <div draggable ref={ref} className="flex flex-col justify-center items-center gap-x-2">
            <h2 className="text-xl mb-4">{title}</h2>
            {list.map((value) => <Card key={value} group={title} value={value} onDragComplete={onDragComplete} />)}
        </div>
    );
}

function generateNumber(length: number, startsWith: number = 1) {
    return Array(length).fill(0).map((_, index) => index + startsWith);
}


const dropTargets = ["Group1", "Group2"];

const DragAndDrop = () => {
    return (
        <DnDContextProvider>
            <div className="p-4 w-1/2 flex items-start bg-slate-400 justify-around">
                <DraggableList title={dropTargets[0]} getInitialValues={() => generateNumber(5)} />
                <DraggableList title={dropTargets[1]} getInitialValues={() => generateNumber(5, 6)} />
            </div>
        </DnDContextProvider>
    );
};

export default DragAndDrop;