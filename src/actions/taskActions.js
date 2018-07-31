import request from 'superagent';

const FETCH_TASK_API = 'http://localhost:8080/services/v1/getTasks';
const PUT_TASK_API = 'http://localhost:8080/services/v1/addTask';
const DEL_TASK_API = 'http://localhost:8080/services/v1/deleteTask';

export function addTaskAction(taskDetails) {
    return (dispatch) => {
        const {id} = taskDetails;
        request.put(PUT_TASK_API).send(taskDetails).then(data => console.log(`Updated task details!`));
        
    };
}

export function fetchTasks() {
    return (dispatch) => {
     request.get(FETCH_TASK_API)
                .then(data => dispatch({type:'LOAD_TASK', taskItems:data.body}))
                .catch(error => console.log(`Error while fetching the user details, ${error}`));
     };
 }
