import { useMemo, useState } from "react";
import AccordionItem from "./accordionItem";
import { AccordionItem as AccordionItemType } from "./types";


type Props = {
    items: AccordionItemType[];
}

const Accordion = ({ items }: Props) => {

    const renderedItems = useMemo(() => {
        return items.map(({ label, content, id }, index) => {
            const props = {
                label, 
                content, 
            }
            return <AccordionItem key={id} {...props}  />
        })
    }, [items]);

    return (
        <div className="border-x border-t rounded">{renderedItems}</div>
    );
};

export default Accordion;