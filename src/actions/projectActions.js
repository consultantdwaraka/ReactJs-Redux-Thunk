
import request from 'superagent';

const FETCH_TASK_API = 'http://localhost:8080/services/v1/getProjects';
const PUT_TASK_API = 'http://localhost:8080/services/v1/addProject';
const DEL_TASK_API = 'http://localhost:8080/services/v1/deleteTask';

export function fetchProjects() {
    console.log(`Action:`);
    return (dispatch)=> {
        request.get(FETCH_TASK_API)
               .then(res => res.body)
               .then(data => {dispatch({type:'FETCH_PROJECT', projectItems:data})})
               .catch(error => dispatch({type:'ERROR_FETCH_PROJECT', error}));
       
    }
}

export function addProjectAction(projectItems) {
    return (dispatch)=> {
        request.put(PUT_TASK_API).send(projectItems).then(res => res.body).then(data => {dispatch(clearProjectForm()); dispatch(fetchProjects())})
       
    }
}

export function clearProjectForm() {
    return (dispatch) => {
        let emptyProjectForm = {projectName:''};
        dispatch({type:'CLEAR_PROJECT_FORM', projectFromData: emptyProjectForm});
    }
}

export function projectLoading() {
    return (dispatch) => {
        dispatch({
            type:'PROJECT_LOADING', status: true
        });
    }
}
