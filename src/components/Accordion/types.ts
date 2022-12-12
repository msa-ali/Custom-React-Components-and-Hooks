import { ReactNode } from "react";

export type AccordionItem = {
    id: string | number;
    label: string;
    content: ReactNode;
};