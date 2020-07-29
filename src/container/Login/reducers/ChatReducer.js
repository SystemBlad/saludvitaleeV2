import { MESSAGE_RECIVED, FETCHING } from '../reducers/index';
const INITIAL_STATE = { fetching: false, Messages:[] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING:
            return { INITIAL_STATE, fetching: true };
        case MESSAGE_RECIVED: {
            return{ ...state, fetching: false, Messages: action.payload}
        }
        default: return state;
    }
    
};
