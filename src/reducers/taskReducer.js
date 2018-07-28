export default function taskReducer(state = {}, action) {
    switch(action.type) {
        case 'ADD_TASK':
            return Object.assign({}, state, {taskItems: action.taskItems});
        case 'LOAD_TASK':
        return Object.assign({}, state, {taskItems: action.taskItems});
        case 'ERROR_FETCH_PROJECT':
            return {error: action.error};
        case 'CLEAR_PROJECT_FORM':
            return Object.assign({}, {projectFormData: action.projectFormData});
        default:
            return state;
    }
}