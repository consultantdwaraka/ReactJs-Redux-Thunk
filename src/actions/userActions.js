import request from 'superagent';
const USER_API = 'http://5b5561f3503d9200146886fb.mockapi.io/test/user';

export function addUserAction(userDetails) {
    return (dispatch) => {
        const {id} = userDetails;
        if(id) {
           let  PUT_USER_API= `${USER_API}`+'/'+`${id}`;
            request.put(PUT_USER_API).send(userDetails).then(data => {dispatch(clearUserForm());dispatch(fetchUsers())});
        } else {
            if(userDetails) {
                request.post(USER_API).send(userDetails).then(data => {dispatch(clearUserForm());dispatch(fetchUsers())});
            }
        }
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
    request.get(USER_API)
               .then(data => dispatch({type:'FETCH_USERS', userItems:data.body}))
               .catch(error => console.log(`Error while fetching the user details, ${error}`));
    };
}

export function deleteUserAction(id) {
    let  DELETE_USER_API= `${USER_API}`+'/'+`${id}`;
    return (dispatch) => {
     request.delete(DELETE_USER_API)
                .then(data => {dispatch(fetchUsers())})
                .catch(error => console.log(`Error while deleting the user details, ${error}`));
     };
 }