import moment from 'moment';
export default function projectReducer(state = {}, action) {
    switch(action.type) {
        case 'FETCH_PROJECT':
            return Object.assign({}, state, {projectItems: action.projectItems});
        case 'PROJECT_LOADING':
            return {status: action.status};
        case 'ERROR_FETCH_PROJECT':
            return {error: action.error};
        case 'EDIT_PROJECT_FORM':
            return Object.assign({}, state, {projectFormData: action.projectFormData});
        case 'UPDATE_PROJECT_NAME':
        console.log('u p n')
            return Object.assign({}, state, {projectName: action.projectName});
        case 'SORT_PROJECTS':
            let sortedProjectItems = sortRecords(state.projectItems, action.columnName);
            return Object.assign({}, state, {projectItems: sortedProjectItems.slice()});
        case 'CLEAR_PROJECT_FORM':
            return Object.assign({}, state, {projectFormData: action.projectFormData});
        default:
            return state;
    }
}

export function sortRecords(projectItems, sortByColumn) {
    if(sortByColumn ==='priority') {
        return projectItems.sort((element1, element2) => Number(element1.priority) > Number(element2.priority)? -1: 1);
    } else if(sortByColumn ==='startDate') {
        return projectItems.sort((element1, element2) => moment(element1.startDate).isAfter(moment(element2.startDate))? -1: 1);
    } else if(sortByColumn ==='endDate') {
        return projectItems.sort((element1, element2) => moment(element1.endDate).isAfter(moment(element2.endDate))? -1: 1);
    } else if(sortByColumn ==='completed') {
        return projectItems.sort((element1, element2) => element1.completed === element2.completed? -1: 1);
    }
    return projectItems;
}
