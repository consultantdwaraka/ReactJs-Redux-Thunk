
export function fetchProjects(url) {
    console.log(`Action: ${url}`);

    return (dispatch)=> {
        dispatch(projectLoading());
        setTimeout(() => {
            dispatch({
                type:'FETCH_PROJECT', projectItems: url
            });
        }, 5000);
       
    }
}

export function projectLoading() {
    return (dispatch) => {
        dispatch({
            type:'PROJECT_LOADING', status: true
        });
    }
}
