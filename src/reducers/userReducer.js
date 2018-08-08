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
        case 'SORT_USERS':
            let sortedUserItems = sortRecords(state.userItems, action.columnName);
            return Object.assign({}, state, {userItems: sortedUserItems.slice()});
        default:
            return state;
    }
}

export function sortRecords(userItems, sortByColumn) {
    if(sortByColumn ==='firstName') {
        return userItems.sort((element1, element2) => element1.firstName > element2.firstName ? 1: -1);
    } else if(sortByColumn ==='lastName') {
        return userItems.sort((element1, element2) => element1.lastName > element2.lastName ? 1: -1);
    } else if(sortByColumn ==='employeeId') {
        return userItems.sort((element1, element2) => element1.employeeId > element2.employeeId ? 1: -1);
    }
    return userItems;
}