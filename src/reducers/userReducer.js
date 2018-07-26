export default function userReducer(state = {}, action) {
    switch(action.type) {
        case 'ADD_USER':
            return state;
        case 'CLEAR_USER_FORM':
            return Object.assign({}, state, {userFormData:action.userFormData});
        case 'EDIT_USER_FORM':
            return Object.assign({}, state, {userFormData:action.userFormData});
        case 'FETCH_USERS':
            return {userItems: action.userItems || []};
        default:
            return state;
    }
}