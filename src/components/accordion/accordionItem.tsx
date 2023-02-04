import { memo, useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';
import { AccordionItem as AccordionItemType  } from "./types";

type Props = Omit<AccordionItemType, 'id'>;

const AccordionItem = memo(({ label, content }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const icon = <span className="text-2xl">{isExpanded ? <GoChevronDown /> : <GoChevronRight />}</span>
    return (
        <>
            <div 
                className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer font-semibold" 
                onClick={() => setIsExpanded(val => !val)}>
                    {label} {icon}
            </div>
            {isExpanded && <div className="border-b p-5">{content}</div>}
        </>
    );
})

export default AccordionItem;