import ActionTypes from './actionTypes';

export const showModal = (modelProps) => dispatch => {
    dispatch({
        type: ActionTypes.SHOW_MODEL,
        modal: modelProps
    });
}

export const hideModal = () => dispatch => {
    dispatch({
        type: ActionTypes.HIDE_MODEL
    });
}