import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';


class AddTask extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, reset } = this.props;
        return (
            <form name="taskForm" autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Project Name: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="projectName" id="projectName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="taskName" className="col-2" >Task: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="taskName" id="taskName" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="priority" className="col-2" >Priority: </label>
                    <Field type="range" className="form-control col-10" component={renderField} name="priority" id="priority" min="0" max="30" step="1" />
                </div>

                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Parent Task: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="parentTask" id="parentTask" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-2 no-wrap" >Start Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control" component={renderField} name="startDate" id="startDate" />
                    </div>
                    <label htmlFor="endDate" className="col-2 no-wrap" >End Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control" component={renderField} name="endDate" id="endDate" />
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
                        <button type="submit" className="btn btn-secondary"> Add</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary" onClick={reset}> Reset</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.taskReducer.taskFormData,
        enableReinitialize: true
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
    if(!values.priority) {
        errors.priority = 'Required';
    }
    if(!values.parentTask) {
        errors.parentTask = 'Required';
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

    if(values.startDate && values.endDate) {
        if(moment(values.startDate).isAfter(values.endDate)) {
         errors.startDate = 'Start Date should be before the End Date';
        }
     }

    return errors;
}

AddTask = reduxForm({
    form: 'addTaskForm',
    validate
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