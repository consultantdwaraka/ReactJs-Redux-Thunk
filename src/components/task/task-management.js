import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddTask from './addTask';
import { addTaskAction } from '../../actions/taskActions';
class TaskManagement extends Component {

    constructor(props) {
        super(props);
    }
    handleSubmit = taskFormData => {
        console.log('test task');
        this.props.addTask(taskFormData);
        this.props.history.push('/viewTask');
    }

    render() {
        return (<div>
                   
                    <AddTask onSubmit={this.handleSubmit}> </AddTask>
                </div>);
    }
}

const mapDispachToProps = (dispatch) => { 
    return {
        addTask: (taskFormData) => dispatch(addTaskAction(taskFormData))
    }
}
export default connect(null, mapDispachToProps)(TaskManagement);