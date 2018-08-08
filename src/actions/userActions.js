import request from 'superagent';
import {reset} from 'redux-form';

const FETCH_USER_API = 'http://localhost:8080/services/v1/getUsers';
const PUT_USER_API = 'http://localhost:8080/services/v1/addUser';
const DEL_USER_API = 'http://localhost:8080/services/v1/deleteUser';

export function addUserAction(userDetails) {
    return (dispatch) => {
        const {id} = userDetails;
            request.put(PUT_USER_API).send(userDetails).then(data => {dispatch(reset('addUserForm'));dispatch(fetchUsers())});
    };
}

export function editUserAction(userDetails) {
    return (dispatch) => {
        dispatch({type:'EDIT_USER_FORM', userFormData: userDetails});
    };
}

export function clearUserForm() {
    return (dispatch) => {
        let emptyUserForm = {fistName:'', lastName:'', employeeId:''};
        dispatch({type:'CLEAR_USER_FORM', userFormData: emptyUserForm});
    }
}
export function fetchUsers() {
   return (dispatch) => {
    request.get(FETCH_USER_API)
               .then(data => dispatch({type:'FETCH_USERS', userItems:data.body}))
               .catch(error => console.log(`Error while fetching the user details, ${error}`));
    };
}

export function deleteUserAction(id) {
    let  DELETE_USER_API= `${DEL_USER_API}`+'/'+`${id}`;
    return (dispatch) => {
     request.delete(DELETE_USER_API)
                .then(data => {dispatch(fetchUsers())})
                .catch(error => console.log(`Error while deleting the user details, ${error}`));
     };
 }

export function sortUsers(sortByColumn) {
    return (dispatch) => {
        dispatch({
            type:'SORT_USERS', columnName: sortByColumn
        });
    }
}