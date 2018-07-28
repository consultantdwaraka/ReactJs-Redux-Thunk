import request from 'superagent';

const TASK_API = 'http://5b5561f3503d9200146886fb.mockapi.io/test/tasks';
export function addTaskAction(taskDetails) {
    return (dispatch) => {
        const {id} = taskDetails;
        if(id) {
           let  PUT_TASK_API= `${TASK_API}`+'/'+`${id}`;
            request.put(PUT_TASK_API).send(taskDetails).then(data => console.log(`Updated task details!`));
        } else {
            if(taskDetails) {
                request.post(TASK_API).send(taskDetails).then(data => console.log(`Added task`));
            }
        }
    };
}

export function fetchTasks() {
    return (dispatch) => {
     request.get(TASK_API)
                .then(data => dispatch({type:'LOAD_TASK', taskItems:data.body}))
                .catch(error => console.log(`Error while fetching the user details, ${error}`));
     };
 }
