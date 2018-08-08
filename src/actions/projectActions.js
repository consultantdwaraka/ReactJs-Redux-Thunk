
import request from 'superagent';
import {reset} from 'redux-form';

const FETCH_TASK_API = 'http://localhost:8080/services/v1/getProjects';
const PUT_TASK_API = 'http://localhost:8080/services/v1/addProject';
const DEL_TASK_API = 'http://localhost:8080/services/v1/deleteTask';

export function fetchProjects() {
    return (dispatch)=> {
        request.get(FETCH_TASK_API)
               .then(res => res.body)
               .then(data => {dispatch({type:'FETCH_PROJECT', projectItems:data.reverse()})})
               .catch(error => dispatch({type:'ERROR_FETCH_PROJECT', error}));
       
    }
}

export function addProjectAction(projectItems) {
    return (dispatch)=> {
        request.put(PUT_TASK_API).send(projectItems).then(res => res.body).then(data => {dispatch(reset('addProjectForm')); dispatch(clearProjectForm()); dispatch(fetchProjects())})
       }
}

export function editProjectAction(projectItem) {
    return (dispatch) => {
        dispatch({type:'EDIT_PROJECT_FORM', projectFormData: projectItem});
    };
}

export function clearProjectForm() {
    return (dispatch) => {
        let emptyProjectForm = {projectName:'', startDate:'', endDate:'',priority:'', managerId:''};
        dispatch({type:'CLEAR_PROJECT_FORM', projectFormData: emptyProjectForm});
    }
}

export function projectLoading() {
    return (dispatch) => {
        dispatch({
            type:'PROJECT_LOADING', status: true
        });
    }
}

export function sortProjects(sortByColumn) {
    return (dispatch) => {
        dispatch({
            type:'SORT_PROJECTS', columnName: sortByColumn
        });
    }
}
