import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddTask from './addTask';
import { addTaskAction } from '../../actions/taskActions';
class TaskManagement extends Component {

    constructor(props) {
        super(props);
    }
    handleSubmit = taskFormData => {
        this.props.addTask(taskFormData);
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