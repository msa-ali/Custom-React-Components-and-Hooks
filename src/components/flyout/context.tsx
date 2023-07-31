import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

export type State = {
    searchText: string;
    open: boolean;
}

type ActionType = 'CHANGE_SEARCH_TEXT' | 'TOGGLE_FLYOUT_VISIBILITY'

type Action = {
    type: ActionType;
    payload?: Partial<State>;
}

const initialState: State = {
    searchText: '',
    open: false,
};

const reducer = (state: State, action: Action): State => {
    return {
        ...state,
        ...action.payload,
    };
}

const useValue = () => useReducer(reducer, initialState);

export const {
    Provider: FlyoutProvider,
    useTrackedState,
    useUpdate: useDispatch,
} = createContainer(useValue);