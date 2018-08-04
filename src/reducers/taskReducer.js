export default function taskReducer(state = {}, action) {
    switch(action.type) {
        case 'ADD_TASK':
            return Object.assign({}, state, {taskItems: action.taskItems});
        case 'LOAD_TASK':
        return Object.assign({}, state, {taskItems: action.taskItems});
        case 'ERROR_FETCH_PROJECT':
            return {error: action.error};
            case 'EDIT_TASK_FORM':
            return Object.assign({}, state, {taskFormData:action.taskFormData});
        case 'CLEAR_TASK_FORM':
            return Object.assign({}, state, {taskFormData: action.taskFormData});
        default:
            return state;
    }
}