export default function userReducer(state = {}, action) {
    switch(action.type) {
        case 'ADD_USER':
            return state;
        case 'FETCH_USERS':
        return {userItems: action.userItems || []};
        default:
            return state;
    }
}