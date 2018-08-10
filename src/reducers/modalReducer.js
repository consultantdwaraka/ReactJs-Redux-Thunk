
import ActionTypes from '../actions/actionTypes'

const initialState = {
    modalProps: {}
  }

const modalReducer = (state = initialState, action) => {
    
    switch(action.type) {
       
        case ActionTypes.SHOW_MODEL:
            return {
                modalProps: action.modal,
                type: action.type
            };
        case ActionTypes.HIDE_MODEL:
            return initialState;
        default:
            return state;
    }
}
export default modalReducer;
