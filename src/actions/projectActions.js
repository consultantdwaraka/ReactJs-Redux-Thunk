
import request from 'superagent';

const ADD_PROJECTS_URL = 'http://5b5561f3503d9200146886fb.mockapi.io/test/projects';

export function fetchProjects() {
    console.log(`Action:`);
    return (dispatch)=> {
        request.get(ADD_PROJECTS_URL)
               .then(res => res.body)
               .then(data => {dispatch({type:'FETCH_PROJECT', projectItems:data})})
               .catch(error => dispatch({type:'ERROR_FETCH_PROJECT', error}));
       
    }
}

export function addProjectAction(projectItems) {
    return (dispatch)=> {
        request.post(ADD_PROJECTS_URL).send(projectItems).then(res => res.body).then(data => {dispatch(clearProjectForm()); dispatch(fetchProjects())})
       
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
