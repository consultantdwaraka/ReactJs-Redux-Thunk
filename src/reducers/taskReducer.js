import moment from 'moment';
export default function taskReducer(state = {}, action) {
    switch(action.type) {
        case 'ADD_TASK':
            return Object.assign({}, state, {taskItems: action.taskItems});
        case 'LOAD_TASK':
        return Object.assign({}, state, {taskItems: action.taskItems});
        case 'ERROR_FETCH_PROJECT':
            return {error: action.error};
        case 'EDIT_TASK_FORM':
            return Object.assign({}, state, {taskFormData: action.taskFormData});
        case 'SORT_TASKS':
            let sortedTaskItems = sortRecords(state.taskItems, action.columnName);
            return Object.assign({}, state, {taskItems: sortedTaskItems.slice()});
        case 'CLEAR_TASK_FORM':
            return Object.assign({}, state, {taskFormData: action.taskFormData});
        default:
            return state;
    }
}

export function sortRecords(taskItems, sortByColumn) {
    if(sortByColumn ==='completed') {
        return taskItems.sort((element1, element2) => element1.status > element2.status ? 1: -1);
    } else if(sortByColumn ==='parentTaskDesc') {
        return taskItems.sort((element1, element2) => element1.parentTaskDesc > element2.parentTaskDesc ? 1: -1);
    } else if(sortByColumn ==='priority') {
        return taskItems.sort((element1, element2) => element1.priority > element2.priority ? 1: -1);
    } else if(sortByColumn ==='startDate') {
        return taskItems.sort((element1, element2) => moment(element1.startDate).isAfter(moment(element2.startDate))? -1: 1);
    } else if(sortByColumn ==='endDate') {
        return taskItems.sort((element1, element2) => moment(element1.endDate).isAfter(moment(element2.endDate))? -1: 1);
    }
    return taskItems;
}