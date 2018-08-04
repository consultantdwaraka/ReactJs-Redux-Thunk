import request from 'superagent';
import {reset} from 'redux-form';

const FETCH_TASK_API = 'http://localhost:8080/services/v1/getTasks';
const PUT_TASK_API = 'http://localhost:8080/services/v1/addTask';
const DEL_TASK_API = 'http://localhost:8080/services/v1/deleteTask';
const END_TASK_API = 'http://localhost:8080/services/v1/endTask';

export function addTaskAction(taskDetails) {
    return (dispatch) => {
        const {id} = taskDetails;
        request.put(PUT_TASK_API).send(taskDetails).then(data => dispatch(reset('addTaskForm')));
        
    };
}

export function endTaskAction(taskDetails) {
    return (dispatch) => {
        const {id} = taskDetails;
        request.post(END_TASK_API).send(taskDetails).then(data => dispatch(fetchTasks()));
    };
}

export function fetchTasks() {
    return (dispatch) => {
     request.get(FETCH_TASK_API)
                .then(data => dispatch({type:'LOAD_TASK', taskItems:data.body}))
                .catch(error => console.log(`Error while fetching the user details, ${error}`));
     };
 }

 export function editTaskAction(taskitem) {
     console.log(`Edit task action: ${JSON.stringify(taskitem)}`);
    return (dispatch) => {
        dispatch({type:'EDIT_TASK_FORM', taskFormData: taskitem});
    };
}

 export function clearTaskForm() {
    return (dispatch) => {
        let emptyTaskForm = {};
        dispatch({type:'CLEAR_TASK_FORM', taskFormData: emptyTaskForm});
    }
}
