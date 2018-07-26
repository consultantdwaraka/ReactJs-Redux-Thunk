import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchUsers, addUserAction, clearUserForm, editUserAction, deleteUserAction} from '../../actions/userActions';
import ListUsers from './listUsers';
import AddUser from './addUser';

class UserManagement extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    handleSubmit = usetDetails => {
        this.props.addUser(usetDetails);
    }

    editUser = (userDetails, event) => {
        this.props.editUser(userDetails);
    }
    deleteUser = (id) => {
        this.props.deleteUser(id);
    }

    render() {  
    return (<div className="container">
                <AddUser onSubmit = {this.handleSubmit}></AddUser>
                
                <div className="container" style={{borderTopStyle:'solid', borderTopColor:'#030350'}}>
                <div className="row" style={{borderBottomStyle:'dotted', padding:'15px'}}>
                        <div className="col-4">
                            <input type="text" className="form-control" placeholder="Search"/>
                        </div>

                            <label className="col-2"> Sort:</label>
                  
                        <div className="col-2">
                            <button type="button" className="btn btn-secondary"> First Name</button>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-secondary"> Last Name</button>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-secondary"> Id</button>
                        </div>
                </div>
                    { this.props.userItems.map(userDetails => <ListUsers userDetails = {userDetails} onEdit={this.editUser} onDelete={this.deleteUser}> </ListUsers>) }
                </div> 
            </div>);
        
    }
}
const mapStateToProps = (state) => {
    return {
        userItems: state.userReducer.userItems || []
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (usetDetails) => {dispatch(addUserAction(usetDetails))},
        editUser: (userDetails) => {dispatch(editUserAction(userDetails))},
        deleteUser: (id) => {dispatch(deleteUserAction(id))},
        fetchUsers: () => {dispatch(fetchUsers())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);