import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/userActions';
import ListUsers from './listUsers';
import AddUser from './addUser';

class UserManagement extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }
    render() {
        
        
    return (<div className="container">
                <AddUser></AddUser>
                <div className="container" style={{borderTopStyle:'solid', borderTopColor:'#030350'}}>
                    { this.props.userItems.map(userDetails => <ListUsers userDetails = {userDetails} > </ListUsers>) }
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
        addUser: () => dispatch(),
        fetchUsers: () => {dispatch(fetchUsers())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);