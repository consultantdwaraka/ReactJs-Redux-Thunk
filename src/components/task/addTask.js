import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';


class AddTask extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, reset, taskId, isParentTask } = this.props;
        return (
            <div>
                 <h1> {taskId?'Edit Task':'Add Task'} </h1>
                    <br/>
                    <br/>
            <form  autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Project Name: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control"   component={renderField} name="projectName" id="projectName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="taskName" className="col-2" >Task: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="taskName" id="taskName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2"> </label>
                    <label className="col-1">
                        <Field type="checkbox" component="input" name="parentTask" id="parentTask" />
                    </label>
                    <label className="col-8" style={{whiteSpace:'noWrap', textAlign:'left'}}>
                        Parent task
                    </label>
                </div>

                <div className="form-group row">
                    <label htmlFor="priority" className="col-2" >Priority: </label>
                    <div className="col-10">
                        <Field type="range" className="form-control"  component={renderField} name="priority" id="priority" min="0" max="30" step="1" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Parent Task: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="parentTaskDesc" id="parentTaskDesc" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-2 no-wrap" >Start Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control"  component={renderField} name="startDate" id="startDate" />
                    </div>
                    <label htmlFor="endDate" className="col-2 no-wrap" >End Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control"  component={renderField} name="endDate" id="endDate" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >User: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="userName" id="userName" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-8">
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-secondary"> {taskId?'Edit Task':'Add Task'}</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary" onClick={reset}> Reset</button>
                    </div>
                </div>
            </form> </div>
        );
    }
}

const formSelector = formValueSelector('addTaskForm');


const mapStateToProps = (state) => {
    const isParentTask = formSelector(state, 'parentTask');
    return {
        initialValues: state.taskReducer.taskFormData,
        enableReinitialize: true,
        taskId: state.taskReducer.taskFormData && state.taskReducer.taskFormData.id,
        isParentTask: isParentTask
    }

}

const validate = values => {
    const errors = {};
    if(!values.projectName) {
        errors.projectName = 'Required';
    }
  
    if(!values.taskName) {
        errors.taskName = 'Required';
    }
    


    if(!values.startDate) {
        errors.startDate = 'Required';
    }
    if(!values.endDate) {
        errors.endDate = 'Required';
    }
    if(!values.userName) {
        errors.userName = 'Required';
    }

    if(!values.priority) {
        errors.priority = 'Required';
    }
    if(!values.parentTask) {
        errors.parentTask = 'Required';
    }

    if(values.startDate && values.endDate) {
        if(moment(values.startDate).isAfter(values.endDate)) {
         errors.startDate = 'Start Date should be before the End Date';
        }
     }
    

    return errors;
}

AddTask = reduxForm({
    form: 'addTaskForm'
})(AddTask);

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
        <input className="form-control" {...input} type={type} />
        {touched &&
          (error && <div class="alert alert-danger">
          {error}
        </div>)}
    </div>
    )

export default connect(mapStateToProps, null)(AddTask);