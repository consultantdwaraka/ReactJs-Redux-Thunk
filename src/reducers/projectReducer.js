export default function projectReducer(state = {}, action) {
    switch(action.type) {
        case 'FETCH_PROJECT':
            return Object.assign({}, state, {projectItems: action.projectItems});
        case 'PROJECT_LOADING':
            return {status: action.status};
        case 'ERROR_FETCH_PROJECT':
            return {error: action.error};
        case 'EDIT_PROJECT_FORM':
            console.log(`${JSON.stringify(action.projectFormData)}`);
            return Object.assign({}, state, {projectFormData: action.projectFormData});
        case 'CLEAR_PROJECT_FORM':
            return Object.assign({}, state, {projectFormData: action.projectFormData});
        default:
            return state;
    }
}
