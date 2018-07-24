import request from 'superagent';
const USER_API = 'http://5b5561f3503d9200146886fb.mockapi.io/test/user';
export function addUser(fistName, lastName, employeeId) {
    request.post(USER_API).send({fistName:fistName, lastName:lastName, employeeId:employeeId}).then(console.log('User been added'));
}
export function fetchUsers() {
   return (dispatch) => {
       
        request.get(USER_API)
               .then(data => dispatch({type:'FETCH_USERS', userItems:data.body}))
               .catch(error => console.log(`Error while fetching the user details, ${error}`));
    };
}