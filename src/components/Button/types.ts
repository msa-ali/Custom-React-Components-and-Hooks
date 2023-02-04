import { ReactNode } from 'react';

export type Appearance = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
    appearance?: Appearance;
    rounded?: boolean;
    outline?: boolean;
}