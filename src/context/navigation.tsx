import { useState, useEffect, useContext, createContext, ReactNode, useCallback, useMemo } from 'react';

interface NavigationContextState {
    currentPath: string;
    navigate: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextState>({} as any);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [currentPath, setCurrentPath] = useState(location.pathname);

    const navigate = useCallback((to: string) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    }, []);

    useEffect(() => {
        const handler = () => {
            setCurrentPath(location.pathname);
        }
        window.addEventListener('popstate', handler)
        return () => {
            window.removeEventListener('popstate', handler);
        }
    }, []);

    return (
        <NavigationContext.Provider value={{currentPath, navigate}}>
            {children}
        </NavigationContext.Provider>
    );
}

export default NavigationContext;