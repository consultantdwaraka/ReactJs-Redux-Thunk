
import request from 'superagent';

export function fetchProjects(url) {
    console.log(`Action: ${url}`);

    return (dispatch)=> {
        dispatch(projectLoading());
        request.get(url)
               .then(res => res.body)
               .then(data => dispatch({type:'FETCH_PROJECT', projectItems:data}))
               .catch(error => dispatch({type:'ERROR_FETCH_PROJECT', error}));
       
    }
}

export function projectLoading() {
    return (dispatch) => {
        dispatch({
            type:'PROJECT_LOADING', status: true
        });
    }
}
