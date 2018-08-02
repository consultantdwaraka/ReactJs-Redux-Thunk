import request from 'superagent';
import {reset} from 'redux-form';

const FETCH_TASK_API = 'http://localhost:8080/services/v1/getTasks';
const PUT_TASK_API = 'http://localhost:8080/services/v1/addTask';
const DEL_TASK_API = 'http://localhost:8080/services/v1/deleteTask';

export function addTaskAction(taskDetails) {
    return (dispatch) => {
        const {id} = taskDetails;
        request.put(PUT_TASK_API).send(taskDetails).then(data => dispatch(reset('addTaskForm')));
        
    };
}

export function fetchTasks() {
    return (dispatch) => {
     request.get(FETCH_TASK_API)
                .then(data => dispatch({type:'LOAD_TASK', taskItems:data.body}))
                .catch(error => console.log(`Error while fetching the user details, ${error}`));
     };
 }

 export function clearTaskForm() {
    return (dispatch) => {
        let emptyTaskForm = {};
        dispatch({type:'CLEAR_TASK_FORM', taskFormData: emptyTaskForm});
    }
}
